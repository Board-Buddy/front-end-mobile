import { COLORS } from "@/constants/colors";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WebViewContainer from "../features/webview/components/WebViewContainer";

const WebViewScreen = () => {
  const { url, headerTitle } = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: !!headerTitle,
      headerTitle,
    });
  }, [headerTitle, navigation]);

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <WebViewContainer endpoint={`/${url}`} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
});

export default WebViewScreen;
