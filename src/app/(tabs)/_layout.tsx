import { COLORS } from "@/constants/colors";
import { Entypo, Feather, FontAwesome5 } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.PRIMARY,
        tabBarInactiveTintColor: COLORS.GRAY_500,
        tabBarLabelStyle: {
          paddingTop: 4,
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
