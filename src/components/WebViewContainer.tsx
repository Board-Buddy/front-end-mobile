import { WebViewBridgeMessage } from "@/types/webview";
import { useRouter } from "expo-router";
import WebView, { WebViewMessageEvent } from "react-native-webview";

interface Props {
  endpoint: string;
}

const WebViewContainer = ({ endpoint }: Props) => {
  const router = useRouter();

  const handleWebViewMessage = (event: WebViewMessageEvent) => {
    try {
      const message = JSON.parse(
        event.nativeEvent.data
      ) as WebViewBridgeMessage;

      if (message.type === "ROUTER_EVENT") {
        const { method, targetPath, webUrl, headerTitle, options } = message;

        switch (method) {
          case "PUSH":
            router.push(
              {
                pathname: targetPath,
                params: {
                  url: webUrl,
                  headerTitle,
                },
              },
              options
            );
            break;

          case "REPLACE":
            router.replace(
              {
                pathname: targetPath,
                params: {
                  url: webUrl,
                  headerTitle,
                },
              },
              options
            );
            break;

          case "BACK":
            router.back();
            break;
        }
      } else if (message.type === "DEBUG") {
        const { payload } = message;

        console.log(payload);
      }
    } catch (error) {
      console.warn("Invalid message format", error);
    }
  };

  const separator = endpoint.includes("?") ? "&" : "?";
  const uri = `${process.env.EXPO_PUBLIC_WEB_VIEW_BASE_URL}${endpoint}${separator}webview=true`;

  return (
    <WebView
      source={{
        uri,
        headers: {
          "Accept-Language": "ko",
        },
      }}
      sharedCookiesEnabled={true} // TODO: 이거 없을때랑 있을때 직접 구분해보기!!
      onMessage={handleWebViewMessage}
    />
  );
};

export default WebViewContainer;
