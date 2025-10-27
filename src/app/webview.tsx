import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WebViewContainer from "../features/webview/components/WebViewContainer";

const WebViewScreen = () => {
  const { url, headerTitle } = useLocalSearchParams();
  const navigation = useNavigation();

  const safeUrl = Array.isArray(url) ? url[0] : url;
  const safeHeaderTitle = Array.isArray(headerTitle)
    ? headerTitle[0]
    : headerTitle;

  useEffect(() => {
    navigation.setOptions({
      headerShown: !!safeHeaderTitle,
      safeHeaderTitle,
    });
  }, [safeHeaderTitle, navigation]);

  return (
    <SafeAreaView
      style={styles.container}
      edges={url.includes("login") ? ["top", "bottom"] : ["bottom"]}
    >
      <WebViewContainer endpoint={safeUrl} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WebViewScreen;
