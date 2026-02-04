-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create dogs table
CREATE TABLE IF NOT EXISTS dogs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  breed TEXT NOT NULL,
  age_months INTEGER NOT NULL,
  behavior_issues TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create training_plans table
CREATE TABLE IF NOT EXISTS training_plans (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  dog_id UUID NOT NULL REFERENCES dogs(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  duration_weeks INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create training_sessions table
CREATE TABLE IF NOT EXISTS training_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  dog_id UUID NOT NULL REFERENCES dogs(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES training_plans(id) ON DELETE SET NULL,
  exercise_name TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL,
  success_rate NUMERIC(5,2) NOT NULL CHECK (success_rate >= 0 AND success_rate <= 100),
  notes TEXT,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  dog_id UUID NOT NULL REFERENCES dogs(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_dogs_user_id ON dogs(user_id);
CREATE INDEX IF NOT EXISTS idx_training_plans_dog_id ON training_plans(dog_id);
CREATE INDEX IF NOT EXISTS idx_training_sessions_dog_id ON training_sessions(dog_id);
CREATE INDEX IF NOT EXISTS idx_training_sessions_plan_id ON training_sessions(plan_id);
CREATE INDEX IF NOT EXISTS idx_achievements_dog_id ON achievements(dog_id);

-- Enable Row Level Security (RLS)
ALTER TABLE dogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- RLS Policies for dogs table
CREATE POLICY "Users can view their own dogs"
  ON dogs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own dogs"
  ON dogs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own dogs"
  ON dogs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own dogs"
  ON dogs FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for training_plans table
CREATE POLICY "Users can view training plans for their dogs"
  ON training_plans FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM dogs WHERE dogs.id = training_plans.dog_id AND dogs.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert training plans for their dogs"
  ON training_plans FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM dogs WHERE dogs.id = training_plans.dog_id AND dogs.user_id = auth.uid()
  ));

CREATE POLICY "Users can update training plans for their dogs"
  ON training_plans FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM dogs WHERE dogs.id = training_plans.dog_id AND dogs.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete training plans for their dogs"
  ON training_plans FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM dogs WHERE dogs.id = training_plans.dog_id AND dogs.user_id = auth.uid()
  ));

-- RLS Policies for training_sessions table
CREATE POLICY "Users can view training sessions for their dogs"
  ON training_sessions FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM dogs WHERE dogs.id = training_sessions.dog_id AND dogs.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert training sessions for their dogs"
  ON training_sessions FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM dogs WHERE dogs.id = training_sessions.dog_id AND dogs.user_id = auth.uid()
  ));

CREATE POLICY "Users can update training sessions for their dogs"
  ON training_sessions FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM dogs WHERE dogs.id = training_sessions.dog_id AND dogs.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete training sessions for their dogs"
  ON training_sessions FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM dogs WHERE dogs.id = training_sessions.dog_id AND dogs.user_id = auth.uid()
  ));

-- RLS Policies for achievements table
CREATE POLICY "Users can view achievements for their dogs"
  ON achievements FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM dogs WHERE dogs.id = achievements.dog_id AND dogs.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert achievements for their dogs"
  ON achievements FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM dogs WHERE dogs.id = achievements.dog_id AND dogs.user_id = auth.uid()
  ));

CREATE POLICY "Users can update achievements for their dogs"
  ON achievements FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM dogs WHERE dogs.id = achievements.dog_id AND dogs.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete achievements for their dogs"
  ON achievements FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM dogs WHERE dogs.id = achievements.dog_id AND dogs.user_id = auth.uid()
  ));
