import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { colors } from "../src/theme/colors";
import { spacing } from "../src/theme/spacing";
import { typography } from "../src/theme/typography";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: "center",
        alignItems: "center",
        padding: spacing.lg,
      }}
    >
      <Text
        style={{
          color: colors.text,
          fontSize: 42,
          fontWeight: typography.title.fontWeight,
          marginBottom: 12,
        }}
      >
        Momentum
      </Text>

      <Text
        style={{
          color: colors.textSecondary,
          fontSize: typography.subtitle.fontSize,
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        Build consistency.{"\n"}One week at a time.
      </Text>

      <TouchableOpacity
        onPress={() => router.push("/tabs/weekly-planning")}
        style={{
          backgroundColor: colors.primary,
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.xxl,
          borderRadius: 14,
        }}
      >
        <Text
          style={{
            color: colors.text,
            fontSize: typography.body.fontSize,
            fontWeight: "700",
          }}
        >
          Comenzar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
