import WebViewContainer from "@/components/WebViewContainer";
import { SafeAreaView, StyleSheet } from "react-native";

const ChatScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <WebViewContainer endpoint="/chat" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatScreen;
