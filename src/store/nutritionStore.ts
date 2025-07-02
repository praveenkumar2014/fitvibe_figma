import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface MealPlan {
  id: string;
  name: string;
  description: string;
  duration: number; // days
  meals: Meal[];
  totalCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories: number;
  ingredients: Ingredient[];
  instructions: string[];
  prepTime: number;
  image?: string;
}

export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  calories: number;
}

export interface FoodLog {
  id: string;
  date: string;
  meals: {
    breakfast?: Meal;
    lunch?: Meal;
    dinner?: Meal;
    snacks: Meal[];
  };
  totalCalories: number;
  waterIntake: number; // in ml
}

interface NutritionState {
  mealPlans: MealPlan[];
  foodLogs: FoodLog[];
  currentMealPlan: MealPlan | null;
  dailyGoals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    water: number;
  };
  setCurrentMealPlan: (mealPlan: MealPlan) => void;
  logFood: (date: string, mealType: string, meal: Meal) => void;
  logWater: (date: string, amount: number) => void;
  updateDailyGoals: (goals: Partial<NutritionState['dailyGoals']>) => void;
}

export const useNutritionStore = create<NutritionState>()(
  persist(
    (set, get) => ({
      mealPlans: [
        {
          id: '1',
          name: 'Weight Loss Plan',
          description: 'A balanced meal plan designed for healthy weight loss',
          duration: 30,
          meals: [],
          totalCalories: 1500,
          macros: { protein: 120, carbs: 150, fat: 50 },
        },
        {
          id: '2',
          name: 'Muscle Gain Plan',
          description: 'High protein meal plan for muscle building',
          duration: 30,
          meals: [],
          totalCalories: 2500,
          macros: { protein: 200, carbs: 250, fat: 80 },
        },
      ],
      foodLogs: [],
      currentMealPlan: null,
      dailyGoals: {
        calories: 2000,
        protein: 150,
        carbs: 200,
        fat: 70,
        water: 2000,
      },

      setCurrentMealPlan: (mealPlan) => {
        set({ currentMealPlan: mealPlan });
      },

      logFood: (date, mealType, meal) => {
        set((state) => {
          const existingLog = state.foodLogs.find((log) => log.date === date);
          
          if (existingLog) {
            const updatedLogs = state.foodLogs.map((log) => {
              if (log.date === date) {
                const updatedMeals = { ...log.meals };
                if (mealType === 'snacks') {
                  updatedMeals.snacks = [...updatedMeals.snacks, meal];
                } else {
                  updatedMeals[mealType as keyof typeof updatedMeals] = meal;
                }
                
                return {
                  ...log,
                  meals: updatedMeals,
                  totalCalories: log.totalCalories + meal.calories,
                };
              }
              return log;
            });
            
            return { foodLogs: updatedLogs };
          } else {
            const newLog: FoodLog = {
              id: Date.now().toString(),
              date,
              meals: {
                snacks: mealType === 'snacks' ? [meal] : [],
                [mealType]: mealType !== 'snacks' ? meal : undefined,
              } as any,
              totalCalories: meal.calories,
              waterIntake: 0,
            };
            
            return { foodLogs: [...state.foodLogs, newLog] };
          }
        });
      },

      logWater: (date, amount) => {
        set((state) => {
          const existingLog = state.foodLogs.find((log) => log.date === date);
          
          if (existingLog) {
            const updatedLogs = state.foodLogs.map((log) =>
              log.date === date
                ? { ...log, waterIntake: log.waterIntake + amount }
                : log
            );
            return { foodLogs: updatedLogs };
          } else {
            const newLog: FoodLog = {
              id: Date.now().toString(),
              date,
              meals: { snacks: [] },
              totalCalories: 0,
              waterIntake: amount,
            };
            return { foodLogs: [...state.foodLogs, newLog] };
          }
        });
      },

      updateDailyGoals: (goals) => {
        set((state) => ({
          dailyGoals: { ...state.dailyGoals, ...goals },
        }));
      },
    }),
    {
      name: 'fitvibe-nutrition',
    }
  )
);