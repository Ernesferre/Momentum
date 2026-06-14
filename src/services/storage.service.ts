import AsyncStorage from "@react-native-async-storage/async-storage";
import { WeekHabits } from "../types/habit";

const WEEK_HABITS_STORAGE_KEY = "@momentum_week_habits";

export const loadWeekHabits = async (): Promise<WeekHabits | null> => {
  try {
    const storedWeekHabits = await AsyncStorage.getItem(
      WEEK_HABITS_STORAGE_KEY,
    );

    if (!storedWeekHabits) {
      return null;
    }

    return JSON.parse(storedWeekHabits);
  } catch (error) {
    console.log("Error loading week habits", error);
    return null;
  }
};

export const saveWeekHabits = async (weekHabits: WeekHabits): Promise<void> => {
  try {
    await AsyncStorage.setItem(
      WEEK_HABITS_STORAGE_KEY,
      JSON.stringify(weekHabits),
    );
  } catch (error) {
    console.log("Error saving week habits", error);
  }
};
