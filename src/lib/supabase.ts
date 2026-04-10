import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = 'https://morkqdnrwvnddxxxwptd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vcmtxZG5yd3ZuZGR4eHh3cHRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2MDQwNDgsImV4cCI6MjA4NDE4MDA0OH0.SIbgOOrmDQ8C5kT93Hz1HLVV0uUdu-kWqhFGtSTYb9s';

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

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
