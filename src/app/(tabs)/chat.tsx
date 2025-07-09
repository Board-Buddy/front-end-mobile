import { SafeAreaView, StyleSheet, Text } from "react-native";

const ChatScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Chat</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatScreen;
