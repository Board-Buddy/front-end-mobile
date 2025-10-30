import { toastConfig } from "@/shared/components/CustomToast";
import { COLORS } from "@/shared/constants/colors";
import { Stack } from "expo-router";
import { StatusBar, useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colorScheme === "dark" ? COLORS.BLACK : COLORS.WHITE}
      />
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
      <Toast config={toastConfig} />
    </SafeAreaProvider>
  );
}
