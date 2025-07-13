import WebViewContainer from "@/components/WebViewContainer";
import { SafeAreaView, StyleSheet } from "react-native";

const MyPageScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <WebViewContainer endpoint="/my" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MyPageScreen;
