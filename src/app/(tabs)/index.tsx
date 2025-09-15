import WebViewContainer from "@/features/webview/components/WebViewContainer";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <WebViewContainer endpoint="/home" tabLayout />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
