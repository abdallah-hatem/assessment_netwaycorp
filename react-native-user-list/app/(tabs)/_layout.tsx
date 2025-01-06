import TabBarIcon from "@/components/TabBarIcon";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "red",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: true,
          title: "Home",
          tabBarIcon: ({ color, focused }) => <TabBarIcon FontAwesomeName={"home"} color={color} />,
        }}
      />
    </Tabs>
  );
}
