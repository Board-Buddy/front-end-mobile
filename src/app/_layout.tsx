import { COLORS } from "@/constants/colors";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="webview"
          options={{
            headerBackButtonDisplayMode: "minimal",
            headerTintColor: COLORS.GRAY_600,
          }}
        />
      </Stack>
      <Toast />
    </SafeAreaProvider>
  );
}
