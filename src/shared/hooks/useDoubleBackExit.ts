import { useNavigationState } from "@react-navigation/native";
import { useEffect, useRef } from "react";
import { BackHandler, Platform, ToastAndroid } from "react-native";

const TAB_ROOT_NAME = "(tabs)";

const useDoubleBackExit = () => {
  const state = useNavigationState((state) => state);
  const routes = state.routes;
  const index = state.index;
  const currentRouteName = routes[index]?.name;

  const isAtTabRoot = currentRouteName === TAB_ROOT_NAME;

  const backPressCountRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isAtTabRoot || Platform.OS !== "android") return;

    const onBackPress = () => {
      if (backPressCountRef.current === 0) {
        ToastAndroid.show(
          "한 번 더 누르면 앱이 종료됩니다",
          ToastAndroid.SHORT
        );

        backPressCountRef.current = 1;

        // 1초 내에 다시 누르지 않으면 초기화
        timeoutRef.current = setTimeout(() => {
          backPressCountRef.current = 0;
        }, 1000);

        return true;
      }

      // 두 번째 눌렸을 때 종료
      BackHandler.exitApp();
      return true;
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );

    return () => {
      subscription.remove();

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      backPressCountRef.current = 0;
    };
  }, [isAtTabRoot]);

  return null;
};

export default useDoubleBackExit;
