import { useWebViewStateStore } from "@/features/webview/stores/webViewStateStore";
import {
  MessageType,
  WebViewBridgeMessage,
} from "@/features/webview/types/webview";
import useKeyboardVisible from "@/hooks/useKeyboardVisible";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useRef } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import WebView, {
  WebViewMessageEvent,
  WebViewProps,
} from "react-native-webview";
import {
  handleDebugMessage,
  handleEditUserInfo,
  handleGetLocationMessage,
  handleGetUserInfoMessage,
  handleLoginMessage,
  handleLogoutMessage,
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
  tabLayout?: boolean;
}

const WebViewContainer = ({ endpoint, tabLayout = false, ...props }: Props) => {
  const router = useRouter();
  const webViewRef = useRef<WebView | null>(null);
  const { setWebViewState, getWebViewState } = useWebViewStateStore();
  const keyboardVisible = useKeyboardVisible();

  useFocusEffect(
    // 탭 레이아웃인 경우 페이지가 활성화될 때마다 유저 정보 전송
    useCallback(() => {
      if (!tabLayout) return;

      handleGetUserInfoMessage(webViewRef);
    }, [tabLayout])
  );

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
        case MessageType.LOGIN:
          handleLoginMessage(message);
          break;
        case MessageType.LOGOUT:
          handleLogoutMessage();
          break;
        case MessageType.GET_USER_INFO:
          handleGetUserInfoMessage(webViewRef);
          break;
        case MessageType.EDIT_USER_INFO:
          handleEditUserInfo(message);
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
      enabled={
        Platform.OS === "android" &&
        !endpoint.includes("home") && // 홈 화면에서 검색어 입력 시 키보드 위로 생기는 여백 방지
        !endpoint.includes("login") // 로그인 화면에서 input 클릭 시 키보드 위로 생기는 여백 방지
      }
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
