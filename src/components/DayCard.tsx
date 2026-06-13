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
  onDeleteHabit: (day: string, habitId: string) => void;
};

export function DayCard({
  day,
  habits,
  onAddHabit,
  onToggleHabit,
  onDeleteHabit,
}: DayCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [habitName, setHabitName] = useState("");

  const isSaveDisabled = habitName.trim().length === 0;

  const completedHabits = habits.filter((habit) => habit.completed).length;
  const totalHabits = habits.length;

  const progressPercentage =
    totalHabits === 0 ? 0 : Math.round((completedHabits / totalHabits) * 100);

  const getDayStatusIcon = () => {
    if (totalHabits === 0) return "⚪";
    if (progressPercentage === 0) return "🔴";
    if (progressPercentage < 50) return "🟠";
    if (progressPercentage < 100) return "🟡";
    return "🟢";
  };

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
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
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

        <Text style={{ fontSize: 18 }}>{getDayStatusIcon()}</Text>
      </View>

      {totalHabits > 0 && (
        <>
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 13,
              marginTop: spacing.xs,
            }}
          >
            {completedHabits} / {totalHabits} completados
          </Text>

          <View
            style={{
              height: 4,
              backgroundColor: colors.background,
              borderRadius: 999,
              marginTop: spacing.sm,
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
        </>
      )}

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
              marginTop: spacing.md,
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
                  : colors.warning,
                paddingVertical: spacing.sm,
                borderRadius: 10,
                alignItems: "center",
                opacity: isSaveDisabled ? 0.6 : 1,
              }}
            >
              <Text
                style={{
                  color: isSaveDisabled ? colors.textSecondary : colors.border,
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
        <View
          key={habit.id}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: spacing.md,
          }}
        >
          <TouchableOpacity
            onPress={() => onToggleHabit(day, habit.id)}
            style={{ flex: 1 }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: habit.completed
                    ? colors.primary
                    : colors.textSecondary,
                  marginRight: spacing.sm,
                  fontSize: 18,
                }}
              >
                {habit.completed ? "☑" : "☐"}
              </Text>

              <Text
                style={{
                  color: habit.completed ? colors.textSecondary : colors.text,
                  textDecorationLine: habit.completed ? "line-through" : "none",
                }}
              >
                {habit.name}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onDeleteHabit(day, habit.id)}
            style={{ padding: spacing.sm }}
          >
            <Text style={{ color: colors.textSecondary, fontSize: 18 }}>✕</Text>
          </TouchableOpacity>
        </View>
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
