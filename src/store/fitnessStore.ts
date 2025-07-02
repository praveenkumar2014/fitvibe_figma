import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Workout {
  id: string;
  name: string;
  duration: number;
  calories: number;
  exercises: Exercise[];
  date: string;
  completed: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number;
  type: 'strength' | 'cardio' | 'flexibility';
}

export interface FitnessGoal {
  id: string;
  type: 'weight_loss' | 'muscle_gain' | 'endurance' | 'strength';
  target: number;
  current: number;
  deadline: string;
  unit: string;
}

interface FitnessState {
  workouts: Workout[];
  goals: FitnessGoal[];
  weeklyStats: {
    workoutsCompleted: number;
    totalCalories: number;
    totalDuration: number;
  };
  addWorkout: (workout: Omit<Workout, 'id'>) => void;
  completeWorkout: (workoutId: string) => void;
  addGoal: (goal: Omit<FitnessGoal, 'id'>) => void;
  updateGoal: (goalId: string, updates: Partial<FitnessGoal>) => void;
  getWeeklyStats: () => void;
}

export const useFitnessStore = create<FitnessState>()(
  persist(
    (set, get) => ({
      workouts: [],
      goals: [],
      weeklyStats: {
        workoutsCompleted: 0,
        totalCalories: 0,
        totalDuration: 0,
      },

      addWorkout: (workout) => {
        const newWorkout: Workout = {
          ...workout,
          id: Date.now().toString(),
        };
        set((state) => ({
          workouts: [...state.workouts, newWorkout],
        }));
      },

      completeWorkout: (workoutId) => {
        set((state) => ({
          workouts: state.workouts.map((workout) =>
            workout.id === workoutId
              ? { ...workout, completed: true }
              : workout
          ),
        }));
        get().getWeeklyStats();
      },

      addGoal: (goal) => {
        const newGoal: FitnessGoal = {
          ...goal,
          id: Date.now().toString(),
        };
        set((state) => ({
          goals: [...state.goals, newGoal],
        }));
      },

      updateGoal: (goalId, updates) => {
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === goalId ? { ...goal, ...updates } : goal
          ),
        }));
      },

      getWeeklyStats: () => {
        const { workouts } = get();
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const weeklyWorkouts = workouts.filter(
          (workout) =>
            new Date(workout.date) >= oneWeekAgo && workout.completed
        );

        const stats = {
          workoutsCompleted: weeklyWorkouts.length,
          totalCalories: weeklyWorkouts.reduce(
            (sum, workout) => sum + workout.calories,
            0
          ),
          totalDuration: weeklyWorkouts.reduce(
            (sum, workout) => sum + workout.duration,
            0
          ),
        };

        set({ weeklyStats: stats });
      },
    }),
    {
      name: 'fitvibe-fitness',
    }
  )
);