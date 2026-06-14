import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DayCard } from "../../src/components/DayCard";
import {
  loadWeekHabits,
  saveWeekHabits,
} from "../../src/services/storage.service";
import { colors } from "../../src/theme/colors";
import { spacing } from "../../src/theme/spacing";
import { typography } from "../../src/theme/typography";
import { Habit, WeekHabits } from "../../src/types/habit";

const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

const EMPTY_WEEK_HABITS: WeekHabits = {
  Lunes: [],
  Martes: [],
  Miércoles: [],
  Jueves: [],
  Viernes: [],
};

export default function WeeklyPlanning() {
  const [weekHabits, setWeekHabits] = useState<WeekHabits>(EMPTY_WEEK_HABITS);

  useEffect(() => {
    const loadStoredWeekHabits = async () => {
      const storedWeekHabits = await loadWeekHabits();

      if (storedWeekHabits) {
        setWeekHabits(storedWeekHabits);
      }
    };

    loadStoredWeekHabits();
  }, []);

  useEffect(() => {
    saveWeekHabits(weekHabits);
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

  const handleResetWeek = () => {
    const resetWeek = () => {
      setWeekHabits(EMPTY_WEEK_HABITS);
    };

    if (Platform.OS === "web") {
      const confirmed = window.confirm(
        "¿Estás seguro de que querés borrar toda la planificación semanal?",
      );

      if (confirmed) {
        resetWeek();
      }

      return;
    }

    Alert.alert(
      "Resetear semana",
      "¿Estás seguro de que querés borrar toda la planificación semanal?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Resetear",
          style: "destructive",
          onPress: resetWeek,
        },
      ],
    );
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
      contentContainerStyle={{
        padding: spacing.lg,
        paddingTop: 64,
        paddingBottom: spacing.xl,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: colors.text,
            fontSize: typography.title.fontSize,
            fontWeight: typography.title.fontWeight,
          }}
        >
          Mi Semana
        </Text>

        <TouchableOpacity onPress={handleResetWeek}>
          <MaterialCommunityIcons
            name="restart"
            size={24}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

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
    </ScrollView>
  );
}
