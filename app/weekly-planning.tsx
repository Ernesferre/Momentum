import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { DayCard } from "../src/components/DayCard";
import { colors } from "../src/theme/colors";
import { spacing } from "../src/theme/spacing";
import { typography } from "../src/theme/typography";
import { Habit, WeekHabits } from "../src/types/habit";

const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

const STORAGE_KEY = "@momentum_week_habits";

export default function WeeklyPlanning() {
  const [weekHabits, setWeekHabits] = useState<WeekHabits>({
    Lunes: [],
    Martes: [],
    Miércoles: [],
    Jueves: [],
    Viernes: [],
  });

  useEffect(() => {
    const loadWeekHabits = async () => {
      try {
        const storedWeekHabits = await AsyncStorage.getItem(STORAGE_KEY);

        if (storedWeekHabits) {
          setWeekHabits(JSON.parse(storedWeekHabits));
        }
      } catch (error) {
        console.log("Error loading week habits", error);
      }
    };

    loadWeekHabits();
  }, []);

  useEffect(() => {
    const saveWeekHabits = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(weekHabits));
      } catch (error) {
        console.log("Error saving week habits", error);
      }
    };

    saveWeekHabits();
  }, [weekHabits]);

  const allHabits = Object.values(weekHabits).flat();

  const completedHabits = allHabits.filter((habit) => habit.completed);

  const progressPercentage =
    allHabits.length === 0
      ? 0
      : Math.round((completedHabits.length / allHabits.length) * 100);

  const handleAddHabit = (day: string, habitName: string) => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      name: habitName,
      completed: false,
    };

    setWeekHabits((prev) => ({
      ...prev,
      [day]: [...prev[day], newHabit],
    }));
  };

  const handleToggleHabit = (day: string, habitId: string) => {
    setWeekHabits((prev) => ({
      ...prev,
      [day]: prev[day].map((habit) =>
        habit.id === habitId
          ? { ...habit, completed: !habit.completed }
          : habit,
      ),
    }));
  };

  const handleDeleteHabit = (day: string, habitId: string) => {
    setWeekHabits((prev) => ({
      ...prev,
      [day]: prev[day].filter((habit) => habit.id !== habitId),
    }));
  };

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
        Mi Semana
      </Text>

      <Text
        style={{
          color: colors.textSecondary,
          fontSize: typography.body.fontSize,
          marginBottom: spacing.xl,
        }}
      >
        Planificá tus hábitos de lunes a viernes.
      </Text>

      <View
        style={{
          backgroundColor: colors.surface,
          borderRadius: 16,
          padding: spacing.lg,
          marginBottom: spacing.lg,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        <Text
          style={{
            color: colors.text,
            fontSize: 22,
            fontWeight: "700",
          }}
        >
          {completedHabits.length} / {allHabits.length}
        </Text>

        <Text
          style={{
            color: colors.textSecondary,
            marginTop: spacing.xs,
          }}
        >
          hábitos completados
        </Text>

        <Text
          style={{
            color: colors.primary,
            marginTop: spacing.sm,
            fontWeight: "700",
          }}
        >
          {progressPercentage}% de progreso semanal
        </Text>
        <View
          style={{
            height: 10,
            backgroundColor: colors.background,
            borderRadius: 999,
            marginTop: spacing.md,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              height: "100%",
              width: `${progressPercentage}%`,
              backgroundColor: colors.primary,
              borderRadius: 999,
            }}
          />
        </View>
      </View>

      {days.map((day) => (
        <DayCard
          key={day}
          day={day}
          habits={weekHabits[day]}
          onAddHabit={handleAddHabit}
          onToggleHabit={handleToggleHabit}
          onDeleteHabit={handleDeleteHabit}
        />
      ))}
    </View>
  );
}
