import { SafeAreaView, StyleSheet, Text } from "react-native";

const MapScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Map</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapScreen;
