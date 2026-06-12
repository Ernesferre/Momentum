import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";

type DayCardProps = {
  day: string;
};

type Habit = {
  id: string;
  name: string;
  completed: boolean;
};

export function DayCard({ day }: DayCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [habitName, setHabitName] = useState("");
  const [habits, setHabits] = useState<Habit[]>([]);

  const handleAddHabit = () => {
    setIsAdding(true);
  };

  const handleSaveHabit = () => {
    if (!habitName.trim()) return;

    const newHabit: Habit = {
      id: Date.now().toString(),
      name: habitName.trim(),
      completed: false,
    };

    setHabits((prev) => [...prev, newHabit]);
    setHabitName("");
    setIsAdding(false);
  };

  const handleToggleHabit = (habitId: string) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === habitId
          ? { ...habit, completed: !habit.completed }
          : habit,
      ),
    );
  };

  const handleCancelAddHabit = () => {
    setHabitName("");
    setIsAdding(false);
  };

  return (
    <View
      style={{
        backgroundColor: colors.surface,
        padding: spacing.lg,
        borderRadius: 16,
        marginBottom: spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
        minHeight: 120,
        justifyContent: "space-between",
      }}
    >
      <Text
        style={{
          color: colors.text,
          fontSize: typography.subtitle.fontSize,
          fontWeight: "700",
        }}
      >
        {day}
      </Text>

      {isAdding && (
        <>
          <TextInput
            value={habitName}
            onChangeText={setHabitName}
            placeholder="Nuevo hábito"
            placeholderTextColor={colors.textSecondary}
            style={{
              backgroundColor: colors.background,
              color: colors.text,
              padding: spacing.sm,
              borderRadius: 10,
              marginTop: spacing.sm,
            }}
          />

          <View
            style={{
              flexDirection: "row",
              gap: spacing.sm,
              marginTop: spacing.sm,
            }}
          >
            <TouchableOpacity
              onPress={handleSaveHabit}
              style={{
                flex: 1,
                backgroundColor: "green",
                paddingVertical: spacing.sm,
                borderRadius: 10,
                alignItems: "center",
              }}
            >
              <Text style={{ color: colors.text, fontWeight: "600" }}>
                Guardar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleCancelAddHabit}
              style={{
                flex: 1,
                backgroundColor: colors.background,
                paddingVertical: spacing.sm,
                borderRadius: 10,
                alignItems: "center",
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <Text style={{ color: colors.textSecondary, fontWeight: "600" }}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {habits.map((habit) => (
        <TouchableOpacity
          key={habit.id}
          onPress={() => handleToggleHabit(habit.id)}
          style={{
            marginTop: spacing.sm,
          }}
        >
          <Text
            style={{
              color: habit.completed ? colors.textSecondary : colors.text,
              textDecorationLine: habit.completed ? "line-through" : "none",
            }}
          >
            {habit.completed ? "✓" : "○"} {habit.name}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        onPress={handleAddHabit}
        style={{
          marginTop: spacing.md,
          backgroundColor: colors.primary,
          paddingVertical: spacing.sm,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: colors.text,
            fontWeight: "600",
          }}
        >
          + Agregar hábito
        </Text>
      </TouchableOpacity>
    </View>
  );
}
