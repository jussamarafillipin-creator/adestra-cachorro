import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Dog = {
  id: string;
  user_id: string;
  name: string;
  breed: string;
  age_months: number;
  behavior_issues: string[];
  created_at: string;
};

export type TrainingPlan = {
  id: string;
  dog_id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration_weeks: number;
  created_at: string;
};

export type TrainingSession = {
  id: string;
  dog_id: string;
  plan_id: string;
  exercise_name: string;
  duration_minutes: number;
  success_rate: number;
  notes: string;
  completed_at: string;
};

export type Achievement = {
  id: string;
  dog_id: string;
  title: string;
  description: string;
  icon: string;
  earned_at: string;
};
