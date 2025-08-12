import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import { useRouter } from "expo-router";
import WebView from "react-native-webview";
import { WebViewStateStore } from "../stores/webViewStateStore";
import {
  DebugMessage,
  MessageType,
  PermissionRequestMessage,
  RegisterStateMessage,
  RouterMessage,
  SaveStateMessage,
} from "../types/webview";

export const handleRouterMessage = (
  router: ReturnType<typeof useRouter>,
  message: RouterMessage
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

export const handleDebugMessage = (message: DebugMessage) => {
  console.log("📨 from web:", message.payload);
};

export const handleSaveStateMessage = (
  getWebViewState: WebViewStateStore["getWebViewState"],
  setWebViewState: WebViewStateStore["setWebViewState"],
  message: SaveStateMessage
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

export const handleRegisterStateMessage = (
  getWebViewState: WebViewStateStore["getWebViewState"],
  webViewRef: React.RefObject<WebView | null>,
  message: RegisterStateMessage
) => {
  const { key } = message;
  const savedState = getWebViewState(key);

  console.log("✅ Restoring state for key:", key, "with state:", savedState);

  if (savedState) {
    webViewRef.current?.postMessage(
      JSON.stringify({ type: MessageType.RESTORE_STATE, state: savedState })
    );
  }
};

export const handlePermissionRequestMessage = async (
  webViewRef: React.RefObject<WebView | null>,
  message: PermissionRequestMessage
) => {
  const { permissionType } = message;
  let status;

  switch (permissionType) {
    case "media-library":
      status = await MediaLibrary.requestPermissionsAsync().then(
        (res) => res.status
      );
      break;
    case "location":
      status = await Location.requestForegroundPermissionsAsync().then(
        (res) => res.status
      );
      break;
    default:
      console.warn("Unknown permission type:", message.permissionType);
  }

  webViewRef.current?.postMessage(
    JSON.stringify({ type: MessageType.PERMISSION_STATUS, state: status })
  );
};

export const handleGetLocationMessage = async (
  webViewRef: React.RefObject<WebView | null>
) => {
  const { coords } = await Location.getCurrentPositionAsync();
  const { latitude, longitude } = coords;

  webViewRef.current?.postMessage(
    JSON.stringify({
      type: MessageType.LOCATION,
      state: { latitude, longitude },
    })
  );
};
