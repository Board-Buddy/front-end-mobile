import { SafeAreaView, StyleSheet, Text } from "react-native";

const MyPageScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>MyPage</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MyPageScreen;
