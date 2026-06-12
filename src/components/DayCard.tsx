import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";
import { Habit } from "../types/habit";

type DayCardProps = {
  day: string;
  habits: Habit[];
  onAddHabit: (day: string, habitName: string) => void;
  onToggleHabit: (day: string, habitId: string) => void;
};

export function DayCard({
  day,
  habits,
  onAddHabit,
  onToggleHabit,
}: DayCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [habitName, setHabitName] = useState("");

  const isSaveDisabled = habitName.trim().length === 0;

  const handleAddHabit = () => {
    setIsAdding(true);
  };

  const handleSaveHabit = () => {
    if (isSaveDisabled) return;

    onAddHabit(day, habitName.trim());

    setHabitName("");
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
            autoFocus
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
              disabled={isSaveDisabled}
              style={{
                flex: 1,
                backgroundColor: isSaveDisabled
                  ? colors.border
                  : colors.primary,
                paddingVertical: spacing.sm,
                borderRadius: 10,
                alignItems: "center",
                opacity: isSaveDisabled ? 0.6 : 1,
              }}
            >
              <Text
                style={{
                  color: colors.text,
                  fontWeight: "600",
                }}
              >
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
          onPress={() => onToggleHabit(day, habit.id)}
          style={{ marginTop: spacing.sm }}
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

      {!isAdding && (
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
          <Text style={{ color: colors.text, fontWeight: "600" }}>
            + Agregar hábito
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
