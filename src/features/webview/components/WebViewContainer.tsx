import { useWebViewStateStore } from "@/features/webview/stores/webViewStateStore";
import {
  MessageType,
  WebViewBridgeMessage,
} from "@/features/webview/types/webview";
import useKeyboardVisible from "@/hooks/useKeyboardVisible";
import { useRouter } from "expo-router";
import { useRef } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import WebView, {
  WebViewMessageEvent,
  WebViewProps,
} from "react-native-webview";
import {
  handleDebugMessage,
  handleGetLocationMessage,
  handlePermissionRequestMessage,
  handleRegisterStateMessage,
  handleRouterMessage,
  handleSaveStateMessage,
  handleToastMessage,
} from "../utils/webViewHandlers";

const WEBVIEW_HEADER = { "Accept-Language": "ko" };

const getWebViewUri = (endpoint: string) => {
  const separator = endpoint.includes("?") ? "&" : "?";
  return `${process.env.EXPO_PUBLIC_WEB_VIEW_BASE_URL}${endpoint}${separator}webview=true`;
};

interface Props extends WebViewProps {
  endpoint: string;
}

const WebViewContainer = ({ endpoint, ...props }: Props) => {
  const router = useRouter();
  const webViewRef = useRef<WebView | null>(null);
  const { setWebViewState, getWebViewState } = useWebViewStateStore();

  const keyboardVisible = useKeyboardVisible();

  const handleWebViewMessage = (event: WebViewMessageEvent) => {
    try {
      const message = JSON.parse(
        event.nativeEvent.data
      ) as WebViewBridgeMessage;

      switch (message.type) {
        case MessageType.ROUTER:
          handleRouterMessage(router, message);
          break;
        case MessageType.DEBUG:
          handleDebugMessage(message);
          break;
        case MessageType.SAVE_STATE:
          handleSaveStateMessage(getWebViewState, setWebViewState, message);
          break;
        case MessageType.REGISTER_STATE:
          handleRegisterStateMessage(getWebViewState, webViewRef, message);
          break;
        case MessageType.PERMISSION_REQUEST:
          handlePermissionRequestMessage(webViewRef, message);
          break;
        case MessageType.GET_LOCATION:
          handleGetLocationMessage(webViewRef);
          break;
        case MessageType.TOAST:
          handleToastMessage(message);
          break;
        default:
          console.warn("Unknown message type:", message.type);
      }
    } catch (error) {
      console.warn("Invalid message format", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      enabled={Platform.OS === "android"}
      keyboardVerticalOffset={keyboardVisible ? 0 : 80}
    >
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
    </KeyboardAvoidingView>
  );
};

export default WebViewContainer;
