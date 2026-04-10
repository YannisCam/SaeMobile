import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";

export function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { name: "Accueil", icon: "home", href: "/" },
    { name: "Classement", icon: "podium", href: "/rankings" },
    { name: "Admin", icon: "settings", href: "/admin" },
  ];

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex-row">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href || pathname.startsWith(tab.href);
        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => router.push(tab.href)}
            className="flex-1 py-4 items-center justify-center"
          >
            <Ionicons
              name={tab.icon}
              size={24}
              color={isActive ? "#7c3aed" : "#9CA3AF"}
            />
            <Text
              className={`text-xs mt-1 font-medium ${
                isActive ? "text-violet-600" : "text-gray-400"
              }`}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
