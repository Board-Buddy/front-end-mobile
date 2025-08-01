import { COLORS } from "@/constants/colors";
import { Entypo, Feather, FontAwesome5 } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useEffect, useRef } from "react";
import { BackHandler, Platform, ToastAndroid } from "react-native";

export const TabLayout = () => {
  const backPressCountRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (Platform.OS !== "android") return;

    const onBackPress = () => {
      if (backPressCountRef.current === 0) {
        ToastAndroid.show(
          "한 번 더 누르면 앱이 종료됩니다",
          ToastAndroid.SHORT
        );
        backPressCountRef.current = 1;

        // 2초 내에 다시 누르지 않으면 초기화
        timeoutRef.current = setTimeout(() => {
          backPressCountRef.current = 0;
        }, 2000);

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
      }
    };
  });

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.PRIMARY,
        tabBarInactiveTintColor: COLORS.GRAY_500,
        tabBarLabelStyle: {
          paddingTop: 2,
          fontSize: 12,
          fontWeight: "bold",
        },
        headerTitleStyle: {
          color: COLORS.GRAY_600,
          fontWeight: "800",
          fontSize: 18,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "홈",
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "채팅",
          tabBarIcon: ({ color }) => (
            <Feather name="message-square" size={24} color={color} />
          ),
          headerTitle: "채팅 목록",
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "지도",
          tabBarIcon: ({ color }) => (
            <Feather name="map-pin" size={24} color={color} />
          ),
          headerTitle: "보드게임 카페 찾기",
        }}
      />
      <Tabs.Screen
        name="my"
        options={{
          title: "마이페이지",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-circle" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
