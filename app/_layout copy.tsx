import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LogBox, Platform } from "react-native";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";

export const unstable_settings = {
  anchor: "(tabs)",
};

// Silence RN Web deprecation noise in dev: pointerEvents prop -> style.pointerEvents
if (Platform.OS === "web") {
  LogBox.ignoreLogs([
    "props.pointerEvents is deprecated. Use style.pointerEvents",
  ]);
  // Filter noisy RN Web deprecation warning from console.warn output in dev
  const originalWarn = console.warn;
  console.warn = (...args: any[]) => {
    const [msg] = args;
    if (
      typeof msg === "string" &&
      msg.includes("props.pointerEvents is deprecated. Use style.pointerEvents")
    ) {
      return;
    }
    originalWarn(...args);
  };
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GluestackUIProvider mode="dark">
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", title: "Modal" }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
