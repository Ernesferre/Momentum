import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { colors } from "../src/theme/colors";
import { spacing } from "../src/theme/spacing";
import { typography } from "../src/theme/typography";
import { WeekHabits } from "../src/types/habit";

const STORAGE_KEY = "@momentum_week_habits";

export default function StatsScreen() {
  const [weekHabits, setWeekHabits] = useState<WeekHabits>({
    Lunes: [],
    Martes: [],
    Miércoles: [],
    Jueves: [],
    Viernes: [],
  });

  useEffect(() => {
    const loadWeekHabits = async () => {
      const storedWeekHabits = await AsyncStorage.getItem(STORAGE_KEY);

      if (storedWeekHabits) {
        setWeekHabits(JSON.parse(storedWeekHabits));
      }
    };

    loadWeekHabits();
  }, []);

  const allHabits = Object.values(weekHabits).flat();
  const completedHabits = allHabits.filter((habit) => habit.completed);
  const pendingHabits = allHabits.filter((habit) => !habit.completed);

  const progressPercentage =
    allHabits.length === 0
      ? 0
      : Math.round((completedHabits.length / allHabits.length) * 100);

  const daysStats = Object.entries(weekHabits).map(([day, habits]) => {
    const completed = habits.filter((habit) => habit.completed).length;
    const total = habits.length;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    return {
      day,
      completed,
      total,
      percentage,
    };
  });

  const daysWithHabits = daysStats.filter((day) => day.total > 0);

  const bestPercentage = daysWithHabits.length
    ? Math.max(...daysWithHabits.map((day) => day.percentage))
    : 0;

  const bestDays = daysWithHabits.filter(
    (day) => day.percentage === bestPercentage,
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        padding: spacing.lg,
        paddingTop: 64,
      }}
    >
      <Text
        style={{
          color: colors.text,
          fontSize: typography.title.fontSize,
          fontWeight: typography.title.fontWeight,
          marginBottom: spacing.sm,
        }}
      >
        Estadísticas
      </Text>

      <Text
        style={{
          color: colors.textSecondary,
          marginBottom: spacing.xl,
        }}
      >
        Resumen de tu semana actual.
      </Text>

      <View
        style={{
          backgroundColor: colors.surface,
          borderRadius: 16,
          padding: spacing.lg,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        <Text style={{ color: colors.textSecondary }}>Progreso semanal</Text>

        <Text
          style={{
            color: colors.text,
            fontSize: 36,
            fontWeight: "800",
            marginTop: spacing.sm,
          }}
        >
          {progressPercentage}%
        </Text>

        <Text
          style={{
            color: colors.textSecondary,
            marginTop: spacing.sm,
          }}
        >
          {completedHabits.length} completados de {allHabits.length} hábitos
        </Text>
      </View>

      <View
        style={{
          backgroundColor: colors.surface,
          borderRadius: 16,
          padding: spacing.lg,
          borderWidth: 1,
          borderColor: colors.border,
          marginTop: spacing.md,
        }}
      >
        <Text style={{ color: colors.text }}>
          Hábitos totales: {allHabits.length}
        </Text>

        <Text style={{ color: colors.text, marginTop: spacing.sm }}>
          Completados: {completedHabits.length}
        </Text>

        <Text style={{ color: colors.text, marginTop: spacing.sm }}>
          Pendientes: {pendingHabits.length}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: colors.surface,
          borderRadius: 16,
          padding: spacing.lg,
          borderWidth: 1,
          borderColor: colors.border,
          marginTop: spacing.md,
        }}
      >
        <Text style={{ color: colors.textSecondary }}>Mejor día</Text>

        <Text
          style={{
            color: colors.text,
            fontSize: 24,
            fontWeight: "700",
            marginTop: spacing.sm,
          }}
        >
          {bestDays.length > 0
            ? `${bestDays.map((day) => day.day).join(", ")} (${bestPercentage}%)`
            : "Sin datos"}
        </Text>
      </View>
    </View>
  );
}
