import { NavigationOptions } from "expo-router/build/global-state/routing";

export enum MessageType {
  ROUTER = "ROUTER",
  DEBUG = "DEBUG",
  SAVE_STATE = "SAVE_STATE",
  RESTORE_STATE = "RESTORE_STATE",
  REGISTER_STATE = "REGISTER_STATE",
  PERMISSION_REQUEST = "PERMISSION_REQUEST",
  PERMISSION_STATUS = "PERMISSION_STATUS",
  LOCATION = "LOCATION",
  GET_LOCATION = "GET_LOCATION",
}

export type NavigationMethod =
  | "PUSH"
  | "REPLACE"
  | "BACK"
  | "FORWARD"
  | "GO_BACK";

export type PermissionType = "media-library" | "location" | "notification";

export type RoutePath = "/" | "/chat" | "/map" | "/my";

export interface RouterMessage {
  type: MessageType.ROUTER;
  method: NavigationMethod;
  targetPath: RoutePath;
  webUrl: string;
  headerTitle?: string;
  options?: NavigationOptions;
}

export interface DebugMessage {
  type: MessageType.DEBUG;
  payload: string;
}

export interface SaveStateMessage {
  type: MessageType.SAVE_STATE;
  key: string;
  state: unknown;
}

export interface RestoreStateMessage {
  type: MessageType.RESTORE_STATE;
  key: string;
}

export interface RegisterStateMessage {
  type: MessageType.REGISTER_STATE;
  key: string;
}

export interface PermissionRequestMessage {
  type: MessageType.PERMISSION_REQUEST;
  permissionType: PermissionType;
}

export interface GetLocationMessage {
  type: MessageType.GET_LOCATION;
}

export type WebViewBridgeMessage =
  | RouterMessage
  | DebugMessage
  | SaveStateMessage
  | RestoreStateMessage
  | RegisterStateMessage
  | PermissionRequestMessage
  | GetLocationMessage;
