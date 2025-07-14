import { NavigationOptions } from "expo-router/build/global-state/routing";

type NavigationMethod = "PUSH" | "REPLACE" | "BACK" | "FORWARD" | "GO_BACK";
type RoutePath = "/" | "/chat" | "/map" | "/my";

interface RouterEvent {
  type: "ROUTER_EVENT";
  method: NavigationMethod;
  targetPath: RoutePath;
  webUrl: string;
  headerTitle?: string;
  options?: NavigationOptions;
}

interface DebugEvent {
  type: "DEBUG";
  payload: string;
}

export type WebViewBridgeMessage = RouterEvent | DebugEvent;
