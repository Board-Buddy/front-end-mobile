import React from "react";
import { Platform } from "react-native";
import { BaseToast, BaseToastProps } from "react-native-toast-message";

export const toastConfig = {
  success: (props: BaseToastProps) => (
    <CustomToast {...props} style={{ borderLeftColor: "green" }} />
  ),
  error: (props: BaseToastProps) => (
    <CustomToast {...props} style={{ borderLeftColor: "red" }} />
  ),
};

const CustomToast = (props: BaseToastProps) => {
  return (
    <BaseToast
      {...props}
      text1Style={{
        fontSize: Platform.OS === "android" ? 14 : 18,
      }}
      text2Style={{
        fontSize: Platform.OS === "android" ? 12 : 16,
      }}
      text1NumberOfLines={0}
      text2NumberOfLines={0}
    />
  );
};

export default CustomToast;
