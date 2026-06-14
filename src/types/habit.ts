export type Habit = {
  id: string;
  name: string;
  completed: boolean;
};

export type WeekHabits = Record<string, Habit[]>;

export type WeekPlan = {
  weekId: string;
  habits: WeekHabits;
};
