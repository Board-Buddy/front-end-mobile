import { COLORS } from "@/constants/colors";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="webview"
        options={{
          headerBackButtonDisplayMode: "minimal",
          headerTintColor: COLORS.GRAY_600,
        }}
      />
    </Stack>
  );
}
