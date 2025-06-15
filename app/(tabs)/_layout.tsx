import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React from "react";

export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        
        tabBarInactiveTintColor: "#663300",
        headerShown: false,
        tabBarLabelStyle: { fontSize: 10, fontWeight: 'bold' },
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 4,
           // use transparent to let `tabBarBackground` show
          borderTopWidth: 0,
          backgroundColor: "#f2f4f8",
          elevation: 0, // Android shadow
        },
      
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen name="fifo"  options={{
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="reorder-three-outline" color={color} size={size} />
    ),
  }}/>
      <Tabs.Screen name="lru" 
      options={{
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="time-outline" color={color} size={size} />
    ),
  }}/>
      <Tabs.Screen name="optimal" options={{
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="checkmark-done-outline" color={color} size={size} />
    ),
  }}/>
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person-circle" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
