-- HABILITAR RLS EM TODAS AS TABELAS
ALTER TABLE dogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE users_profile ENABLE ROW LEVEL SECURITY;

-- REMOVER POLÍTICAS ANTIGAS
DROP POLICY IF EXISTS "dogs_select" ON dogs;
DROP POLICY IF EXISTS "dogs_insert" ON dogs;
DROP POLICY IF EXISTS "dogs_update" ON dogs;
DROP POLICY IF EXISTS "dogs_delete" ON dogs;
DROP POLICY IF EXISTS "Users can view own dogs" ON dogs;
DROP POLICY IF EXISTS "Users can insert own dogs" ON dogs;
DROP POLICY IF EXISTS "Users can update own dogs" ON dogs;
DROP POLICY IF EXISTS "Users can delete own dogs" ON dogs;
DROP POLICY IF EXISTS "sessions_select" ON training_sessions;
DROP POLICY IF EXISTS "sessions_insert" ON training_sessions;
DROP POLICY IF EXISTS "sessions_update" ON training_sessions;
DROP POLICY IF EXISTS "sessions_delete" ON training_sessions;
DROP POLICY IF EXISTS "plans_select" ON training_plans;
DROP POLICY IF EXISTS "plans_insert" ON training_plans;
DROP POLICY IF EXISTS "plans_update" ON training_plans;
DROP POLICY IF EXISTS "plans_delete" ON training_plans;
DROP POLICY IF EXISTS "achievements_select" ON achievements;
DROP POLICY IF EXISTS "achievements_insert" ON achievements;
DROP POLICY IF EXISTS "achievements_delete" ON achievements;
DROP POLICY IF EXISTS "profile_select" ON users_profile;
DROP POLICY IF EXISTS "profile_insert" ON users_profile;
DROP POLICY IF EXISTS "profile_update" ON users_profile;

-- DOGS
CREATE POLICY "dogs_select" ON dogs FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "dogs_insert" ON dogs FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "dogs_update" ON dogs FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "dogs_delete" ON dogs FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- TRAINING_SESSIONS (acesso via dog do usuário)
CREATE POLICY "sessions_select" ON training_sessions FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM dogs WHERE dogs.id = training_sessions.dog_id AND dogs.user_id = auth.uid()));
CREATE POLICY "sessions_insert" ON training_sessions FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM dogs WHERE dogs.id = training_sessions.dog_id AND dogs.user_id = auth.uid()));
CREATE POLICY "sessions_update" ON training_sessions FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM dogs WHERE dogs.id = training_sessions.dog_id AND dogs.user_id = auth.uid()));
CREATE POLICY "sessions_delete" ON training_sessions FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM dogs WHERE dogs.id = training_sessions.dog_id AND dogs.user_id = auth.uid()));

-- TRAINING_PLANS (acesso via dog do usuário)
CREATE POLICY "plans_select" ON training_plans FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM dogs WHERE dogs.id = training_plans.dog_id AND dogs.user_id = auth.uid()));
CREATE POLICY "plans_insert" ON training_plans FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM dogs WHERE dogs.id = training_plans.dog_id AND dogs.user_id = auth.uid()));
CREATE POLICY "plans_update" ON training_plans FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM dogs WHERE dogs.id = training_plans.dog_id AND dogs.user_id = auth.uid()));
CREATE POLICY "plans_delete" ON training_plans FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM dogs WHERE dogs.id = training_plans.dog_id AND dogs.user_id = auth.uid()));

-- ACHIEVEMENTS (acesso via dog do usuário)
CREATE POLICY "achievements_select" ON achievements FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM dogs WHERE dogs.id = achievements.dog_id AND dogs.user_id = auth.uid()));
CREATE POLICY "achievements_insert" ON achievements FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM dogs WHERE dogs.id = achievements.dog_id AND dogs.user_id = auth.uid()));
CREATE POLICY "achievements_delete" ON achievements FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM dogs WHERE dogs.id = achievements.dog_id AND dogs.user_id = auth.uid()));

-- USERS_PROFILE
CREATE POLICY "profile_select" ON users_profile FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "profile_insert" ON users_profile FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "profile_update" ON users_profile FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
