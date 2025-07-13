import WebViewContainer from "@/components/WebViewContainer";
import { SafeAreaView, StyleSheet } from "react-native";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <WebViewContainer endpoint="" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
