import WebViewContainer from "@/components/WebViewContainer";
import { SafeAreaView, StyleSheet } from "react-native";

const MapScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <WebViewContainer endpoint="/map" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapScreen;
