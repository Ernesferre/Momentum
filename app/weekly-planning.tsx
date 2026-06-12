import { Text, View } from "react-native";
import { DayCard } from "../src/components/DayCard";
import { colors } from "../src/theme/colors";
import { spacing } from "../src/theme/spacing";
import { typography } from "../src/theme/typography";

const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

export default function WeeklyPlanning() {
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

      {days.map((day) => (
        <DayCard key={day} day={day} />
      ))}
    </View>
  );
}
