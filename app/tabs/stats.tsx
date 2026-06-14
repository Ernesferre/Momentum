import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { loadWeekHabits } from "../../src/services/storage.service";
import { colors } from "../../src/theme/colors";
import { spacing } from "../../src/theme/spacing";
import { typography } from "../../src/theme/typography";
import { WeekHabits } from "../../src/types/habit";

export default function StatsScreen() {
  const [weekHabits, setWeekHabits] = useState<WeekHabits>({
    Lunes: [],
    Martes: [],
    Miércoles: [],
    Jueves: [],
    Viernes: [],
  });

  useFocusEffect(
    useCallback(() => {
      const loadStoredWeekHabits = async () => {
        const storedWeekHabits = await loadWeekHabits();

        if (storedWeekHabits) {
          setWeekHabits(storedWeekHabits);
        }
      };

      loadStoredWeekHabits();
    }, []),
  );

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

  const perfectDays = daysStats.filter(
    (day) => day.total > 0 && day.completed === day.total,
  );

  const daysWithHabits = daysStats.filter((day) => day.total > 0);

  const bestPercentage = daysWithHabits.length
    ? Math.max(...daysWithHabits.map((day) => day.percentage))
    : 0;

  const bestDays = daysWithHabits.filter(
    (day) => day.percentage === bestPercentage,
  );

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        padding: spacing.lg,
        paddingTop: 64,
      }}
    >
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          marginBottom: spacing.lg,
          alignSelf: "flex-start",
        }}
      >
        <Text
          style={{
            color: colors.primary,
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          ← Mi Semana
        </Text>
      </TouchableOpacity>
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
        <Text
          style={{
            color: colors.text,
            fontSize: typography.subtitle.fontSize,
            fontWeight: "700",
            marginBottom: spacing.md,
          }}
        >
          Rendimiento por día
        </Text>

        {daysStats.map((dayStat) => {
          const statusIcon =
            dayStat.total === 0
              ? "⚪"
              : dayStat.percentage === 0
                ? "🔴"
                : dayStat.percentage < 50
                  ? "🟠"
                  : dayStat.percentage < 100
                    ? "🟡"
                    : "🟢";

          return (
            <View
              key={dayStat.day}
              style={{
                marginBottom: spacing.md,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: spacing.xs,
                }}
              >
                <Text style={{ color: colors.text }}>
                  {statusIcon} {dayStat.day}
                </Text>

                <Text style={{ color: colors.textSecondary }}>
                  {dayStat.total === 0
                    ? "Sin hábitos"
                    : `${dayStat.percentage}%`}
                </Text>
              </View>

              {dayStat.total > 0 && (
                <View
                  style={{
                    height: 5,
                    backgroundColor: colors.background,
                    borderRadius: 999,
                    overflow: "hidden",
                  }}
                >
                  <View
                    style={{
                      height: "100%",
                      width: `${dayStat.percentage}%`,
                      backgroundColor: colors.primary,
                      borderRadius: 999,
                    }}
                  />
                </View>
              )}
            </View>
          );
        })}
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
          <Text style={{ color: colors.textSecondary }}>🔥 Días perfectos</Text>

          <Text
            style={{
              color: colors.text,
              fontSize: 22,
              fontWeight: "700",
              marginTop: spacing.sm,
            }}
          >
            {perfectDays.length > 0
              ? perfectDays.map((day) => day.day).join(", ")
              : "Todavía ninguno"}
          </Text>

          <Text
            style={{
              color: colors.textSecondary,
              marginTop: spacing.sm,
            }}
          >
            {perfectDays.length} de 5 días completados al 100%
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
