import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import WebViewContainer from "../components/WebViewContainer";

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
    <SafeAreaView style={styles.container}>
      <WebViewContainer endpoint={`/${url}`} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WebViewScreen;
