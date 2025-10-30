import { COLORS } from "@/shared/constants/colors";
import useDoubleBackExit from "@/shared/hooks/useDoubleBackExit";
import { Entypo, Feather, FontAwesome5 } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

export const TabLayout = () => {
  useDoubleBackExit();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: Platform.OS === "android" ? 105 : undefined, // Android만 105dp로 설정, iOS는 기본값 사용
        },
        tabBarActiveTintColor: COLORS.PRIMARY,
        tabBarInactiveTintColor: COLORS.GRAY_500,
        tabBarLabelStyle: {
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
            <Entypo name="home" size={20} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "채팅",
          tabBarIcon: ({ color }) => (
            <Feather name="message-square" size={20} color={color} />
          ),
          headerTitle: "채팅 목록",
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "지도",
          tabBarIcon: ({ color }) => (
            <Feather name="map-pin" size={20} color={color} />
          ),
          headerTitle: "보드게임 카페 찾기",
        }}
      />
      <Tabs.Screen
        name="my"
        options={{
          title: "마이페이지",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-circle" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
