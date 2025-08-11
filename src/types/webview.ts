import { NavigationOptions } from "expo-router/build/global-state/routing";

type NavigationMethod = "PUSH" | "REPLACE" | "BACK" | "FORWARD" | "GO_BACK";
type RoutePath = "/" | "/chat" | "/map" | "/my";

export interface RouterEvent {
  type: "ROUTER_EVENT";
  method: NavigationMethod;
  targetPath: RoutePath;
  webUrl: string;
  headerTitle?: string;
  options?: NavigationOptions;
}

export interface DebugEvent {
  type: "DEBUG";
  payload: string;
}

export interface SaveStateEvent {
  type: "SAVE_STATE";
  key: string;
  state: unknown;
}

export interface RestoreStateEvent {
  type: "RESTORE_STATE";
  key: string;
}

export interface RegisterStateEvent {
  type: "REGISTER_STATE";
  key: string;
}

export interface PermissionRequestEvent {
  type: "PERMISSION_REQUEST";
  permissionType: "media-library" | "location" | "notification";
}

export type WebViewBridgeMessage =
  | RouterEvent
  | DebugEvent
  | SaveStateEvent
  | RestoreStateEvent
  | RegisterStateEvent
  | PermissionRequestEvent;
