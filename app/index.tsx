import { SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView source={{ uri: "https://m.boardbuddi.com" }} />
    </SafeAreaView>
  );
}
