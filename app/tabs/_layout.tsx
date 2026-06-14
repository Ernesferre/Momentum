import { Tabs } from "expo-router";
import { colors } from "../../src/theme/colors";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
      }}
    >
      <Tabs.Screen
        name="weekly-planning"
        options={{
          title: "Semana",
        }}
      />

      <Tabs.Screen
        name="stats"
        options={{
          title: "Estadísticas",
        }}
      />
    </Tabs>
  );
}
