import { COLORS } from "@/constants/colors";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Edges, SafeAreaView } from "react-native-safe-area-context";
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

  const edges: Edges = url.includes("search") ? ["top", "bottom"] : ["bottom"];

  return (
    <SafeAreaView style={styles.container} edges={edges}>
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
