import {
  useWebViewStateStore,
  WebViewStateStore,
} from "@/stores/webViewStateStore";
import {
  DebugEvent,
  PermissionRequestEvent,
  RegisterStateEvent,
  RouterEvent,
  SaveStateEvent,
  WebViewBridgeMessage,
} from "@/types/webview";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";

import { useRouter } from "expo-router";
import { useRef } from "react";
import WebView, {
  WebViewMessageEvent,
  WebViewProps,
} from "react-native-webview";

const WEBVIEW_HEADER = { "Accept-Language": "ko" };

const getWebViewUri = (endpoint: string) => {
  const separator = endpoint.includes("?") ? "&" : "?";
  return `${process.env.EXPO_PUBLIC_WEB_VIEW_BASE_URL}${endpoint}${separator}webview=true`;
};

const handleRouterEvent = (
  router: ReturnType<typeof useRouter>,
  message: RouterEvent
) => {
  const { method, targetPath, webUrl, headerTitle, options } = message;
  const route = {
    pathname: targetPath,
    params: { url: webUrl, headerTitle },
  };

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
  }
};

const handleDebugEvent = (message: DebugEvent) => {
  console.log("📨 from web:", message.payload);
};

const handleSaveStateEvent = (
  getWebViewState: WebViewStateStore["getWebViewState"],
  setWebViewState: WebViewStateStore["setWebViewState"],
  message: SaveStateEvent
) => {
  const { key, state } = message;

  console.log("💾 Saving state for key:", key, "with state:", state);

  const savedState = getWebViewState(key);

  if (savedState && state !== null && typeof state === "object") {
    setWebViewState(key, { ...savedState, ...state });
    return;
  }

  setWebViewState(key, state);
};

const handleRegisterStateEvent = (
  getWebViewState: WebViewStateStore["getWebViewState"],
  webViewRef: React.RefObject<WebView | null>,
  message: RegisterStateEvent
) => {
  const { key } = message;
  const savedState = getWebViewState(key);

  console.log("✅ Restoring state for key:", key, "with state:", savedState);

  if (savedState) {
    webViewRef.current?.postMessage(
      JSON.stringify({ type: "RESTORE_STATE", state: savedState })
    );
  }
};

const requestMediaLibraryPermission = async () =>
  await MediaLibrary.requestPermissionsAsync().then((res) => res.status);

const requestLocationPermission = async () =>
  await Location.requestForegroundPermissionsAsync().then((res) => res.status);

const handlePermissionRequestEvent = async (
  webViewRef: React.RefObject<WebView | null>,
  message: PermissionRequestEvent
) => {
  const { permissionType } = message;
  let status;

  switch (permissionType) {
    case "media-library":
      status = await requestMediaLibraryPermission();
      break;
    case "location":
      status = await requestLocationPermission();
      break;
    default:
      console.warn("Unknown permission type:", message.permissionType);
  }

  webViewRef.current?.postMessage(
    JSON.stringify({ type: "PERMISSION_STATUS", state: status })
  );
};

const handleGetLocationEvent = async (
  webViewRef: React.RefObject<WebView | null>
) => {
  const { coords } = await Location.getCurrentPositionAsync();
  const { latitude, longitude } = coords;

  webViewRef.current?.postMessage(
    JSON.stringify({ type: "LOCATION", state: { latitude, longitude } })
  );
};

interface Props extends WebViewProps {
  endpoint: string;
}

const WebViewContainer = ({ endpoint, ...props }: Props) => {
  const router = useRouter();
  const webViewRef = useRef<WebView | null>(null);
  const { setWebViewState, getWebViewState } = useWebViewStateStore();

  const handleWebViewMessage = (event: WebViewMessageEvent) => {
    try {
      const message = JSON.parse(
        event.nativeEvent.data
      ) as WebViewBridgeMessage;

      switch (message.type) {
        case "ROUTER_EVENT":
          handleRouterEvent(router, message);
          break;
        case "DEBUG":
          handleDebugEvent(message);
          break;
        case "SAVE_STATE":
          handleSaveStateEvent(getWebViewState, setWebViewState, message);
          break;
        case "REGISTER_STATE":
          handleRegisterStateEvent(getWebViewState, webViewRef, message);
          break;
        case "PERMISSION_REQUEST":
          handlePermissionRequestEvent(webViewRef, message);
          break;
        case "GET_LOCATION":
          handleGetLocationEvent(webViewRef);
          break;
        default:
          console.warn("Unknown message type:", message.type);
      }
    } catch (error) {
      console.warn("Invalid message format", error);
    }
  };

  return (
    <WebView
      ref={webViewRef}
      source={{
        uri: getWebViewUri(endpoint),
        headers: WEBVIEW_HEADER,
      }}
      sharedCookiesEnabled={true}
      onMessage={handleWebViewMessage}
      {...props}
    />
  );
};

export default WebViewContainer;
