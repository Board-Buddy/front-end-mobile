import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { Href, useRouter } from "expo-router";
import { NavigationOptions } from "expo-router/build/global-state/routing";
import { Linking, Platform } from "react-native";
import Toast from "react-native-toast-message";
import WebView from "react-native-webview";
import { WebViewStateStore } from "../stores/webViewStateStore";
import {
  DebugMessage,
  MessageType,
  PermissionRequestMessage,
  PermissionStatus,
  RegisterStateMessage,
  RouterMessage,
  SaveStateMessage,
  ToastMessage,
  WebViewBridgeMessage,
} from "../types/webview";

const postWVMessage = <T extends WebViewBridgeMessage>(
  webView: WebView,
  message: T
) => webView.postMessage(JSON.stringify(message));

// 도메인 판별
// 내부 도메인일 경우 url scheme을 제외하고 상대 경로만 오기 때문에,
// http 혹은 https가 포함되어 있다면 외부 도메인으로 판단
const isExternal = (url: string) =>
  url.startsWith("http") || url.startsWith("https");

// 외부 브라우저 열기
const openExternalUrl = async (url: string) => {
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    await Linking.openURL(url);
  } else {
    console.warn(`이 URL을 열 수 없습니다. url: ${url}`);
  }
};

// 라우터 메서드 실행
const navigate = (
  router: ReturnType<typeof useRouter>,
  method: string,
  route: Href,
  options?: NavigationOptions
) => {
  switch (method) {
    case "PUSH":
      router.push(route, options);
      break;
    case "REPLACE":
      router.replace(route, options);
      break;
    case "BACK":
      router.back();
      break;
    default:
      console.warn(`지원하지 않는 라우터 메서드: ${method}`);
  }
};

export const handleRouterMessage = (
  router: ReturnType<typeof useRouter>,
  message: RouterMessage
) => {
  const { method, targetPath, webUrl, headerTitle, options } = message.payload;

  if (webUrl && isExternal(webUrl)) {
    openExternalUrl(webUrl);
    return;
  }

  const route = {
    pathname: targetPath,
    params: { url: webUrl, headerTitle },
  };

  navigate(router, method, route, options);
};

export const handleDebugMessage = (message: DebugMessage) =>
  console.log("📨 from web:", message.payload.log);

export const handleSaveStateMessage = (
  getWebViewState: WebViewStateStore["getWebViewState"],
  setWebViewState: WebViewStateStore["setWebViewState"],
  message: SaveStateMessage
) => {
  const { key, state } = message.payload;

  console.log("💾 Saving state for key:", key, "with state:", state);

  const savedState = getWebViewState(key);

  if (savedState && state !== null && typeof state === "object") {
    setWebViewState(key, { ...savedState, ...state });
    return;
  }

  setWebViewState(key, state);
};

export const handleRegisterStateMessage = (
  getWebViewState: WebViewStateStore["getWebViewState"],
  webViewRef: React.RefObject<WebView | null>,
  message: RegisterStateMessage
) => {
  const { key } = message.payload;
  const savedState = getWebViewState(key);

  console.log("✅ Restoring state for key:", key, "with state:", savedState);

  if (webViewRef.current) {
    postWVMessage(webViewRef.current, {
      type: MessageType.RESTORE_STATE,
      payload: { key, state: savedState === undefined ? null : savedState },
    });
  }
};

export const handlePermissionRequestMessage = async (
  webViewRef: React.RefObject<WebView | null>,
  message: PermissionRequestMessage
) => {
  const { permissionType } = message.payload;
  let status: PermissionStatus = "undetermined";

  switch (permissionType) {
    case "location":
      status = await Location.requestForegroundPermissionsAsync().then(
        (res) => res.status
      );
      break;
    default:
      console.warn("Unknown permission type:", message.payload.permissionType);
  }

  if (webViewRef.current) {
    postWVMessage(webViewRef.current, {
      type: MessageType.PERMISSION_STATUS,
      payload: { status },
    });
  }
};

export const handleGetLocationMessage = async (
  webViewRef: React.RefObject<WebView | null>
) => {
  const { coords } = await Location.getCurrentPositionAsync();
  const { latitude, longitude } = coords;

  if (webViewRef.current) {
    postWVMessage(webViewRef.current, {
      type: MessageType.LOCATION,
      payload: { latitude, longitude },
    });
  }
};

export const handleToastMessage = (message: ToastMessage) => {
  const { type, title, description, duration } = message.payload;

  Toast.show({
    type,
    text1: title,
    text2: description,
    visibilityTime: duration,
    topOffset: Platform.OS === "android" ? 40 : 60,
  });
};

export const handlePickImageMessage = async (
  webViewRef: React.RefObject<WebView | null>
) => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: false,
  });

  if (!webViewRef.current) {
    console.warn("WebView reference is null");
    return;
  }

  if (result.canceled) return;

  const imageUri = result.assets[0].uri;

  // 이미지 파일을 blob으로 변환 후 base64 인코딩
  try {
    const response = await fetch(imageUri);
    const blob = await response.blob();

    // blob -> base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = reader.result as string;

      if (!webViewRef.current) return;

      postWVMessage(webViewRef.current, {
        type: MessageType.IMAGE,
        payload: { data: base64data },
      });
    };

    reader.readAsDataURL(blob);
  } catch (error) {
    console.error("이미지 base64 인코딩 실패: ", error);
  }
};
