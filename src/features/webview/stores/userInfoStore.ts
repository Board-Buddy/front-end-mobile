import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface UserInfo {
  nickname: string;
  memberType: "REGULAR" | "SOCIAL";
  isPhoneNumberVerified: boolean;
  profileImageSignedURL: string | null;
}

export interface UserInfoStore {
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: UserInfo) => void;
  getUserInfo: () => UserInfo | null;
  clearUserInfo: () => void;
}

export const useUserInfoStore = create<UserInfoStore>()(
  persist<UserInfoStore>(
    (set, get) => ({
      userInfo: null,
      setUserInfo: (info: UserInfo) => set({ userInfo: info }),
      getUserInfo: () => get().userInfo,
      clearUserInfo: () => set({ userInfo: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
