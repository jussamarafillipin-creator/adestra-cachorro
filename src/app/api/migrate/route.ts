import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json({ error: 'Variáveis de ambiente não configuradas' }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const sqlStatements = [
    `CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`,
    `CREATE TABLE IF NOT EXISTS dogs (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,
      name TEXT NOT NULL,
      breed TEXT NOT NULL,
      age_months INTEGER NOT NULL,
      behavior_issues TEXT[] DEFAULT '{}',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )`,
    `CREATE TABLE IF NOT EXISTS training_plans (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      dog_id UUID NOT NULL REFERENCES dogs(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
      duration_weeks INTEGER NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )`,
    `CREATE TABLE IF NOT EXISTS training_sessions (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      dog_id UUID NOT NULL REFERENCES dogs(id) ON DELETE CASCADE,
      plan_id UUID REFERENCES training_plans(id) ON DELETE SET NULL,
      exercise_name TEXT NOT NULL,
      duration_minutes INTEGER NOT NULL,
      success_rate NUMERIC(5,2) NOT NULL CHECK (success_rate >= 0 AND success_rate <= 100),
      notes TEXT,
      completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )`,
    `CREATE TABLE IF NOT EXISTS achievements (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      dog_id UUID NOT NULL REFERENCES dogs(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      icon TEXT NOT NULL,
      earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )`,
    `CREATE INDEX IF NOT EXISTS idx_dogs_user_id ON dogs(user_id)`,
    `ALTER TABLE dogs ENABLE ROW LEVEL SECURITY`,
    `ALTER TABLE training_plans ENABLE ROW LEVEL SECURITY`,
    `ALTER TABLE training_sessions ENABLE ROW LEVEL SECURITY`,
    `ALTER TABLE achievements ENABLE ROW LEVEL SECURITY`,
    `DROP POLICY IF EXISTS "Users can view their own dogs" ON dogs`,
    `CREATE POLICY "Users can view their own dogs" ON dogs FOR SELECT USING (auth.uid() = user_id)`,
    `DROP POLICY IF EXISTS "Users can insert their own dogs" ON dogs`,
    `CREATE POLICY "Users can insert their own dogs" ON dogs FOR INSERT WITH CHECK (auth.uid() = user_id)`,
    `DROP POLICY IF EXISTS "Users can update their own dogs" ON dogs`,
    `CREATE POLICY "Users can update their own dogs" ON dogs FOR UPDATE USING (auth.uid() = user_id)`,
    `DROP POLICY IF EXISTS "Users can delete their own dogs" ON dogs`,
    `CREATE POLICY "Users can delete their own dogs" ON dogs FOR DELETE USING (auth.uid() = user_id)`,
    `DROP POLICY IF EXISTS "Users can view training plans for their dogs" ON training_plans`,
    `CREATE POLICY "Users can view training plans for their dogs" ON training_plans FOR SELECT USING (EXISTS (SELECT 1 FROM dogs WHERE dogs.id = training_plans.dog_id AND dogs.user_id = auth.uid()))`,
    `DROP POLICY IF EXISTS "Users can insert training plans for their dogs" ON training_plans`,
    `CREATE POLICY "Users can insert training plans for their dogs" ON training_plans FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM dogs WHERE dogs.id = training_plans.dog_id AND dogs.user_id = auth.uid()))`,
    `DROP POLICY IF EXISTS "Users can view training sessions for their dogs" ON training_sessions`,
    `CREATE POLICY "Users can view training sessions for their dogs" ON training_sessions FOR SELECT USING (EXISTS (SELECT 1 FROM dogs WHERE dogs.id = training_sessions.dog_id AND dogs.user_id = auth.uid()))`,
    `DROP POLICY IF EXISTS "Users can insert training sessions for their dogs" ON training_sessions`,
    `CREATE POLICY "Users can insert training sessions for their dogs" ON training_sessions FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM dogs WHERE dogs.id = training_sessions.dog_id AND dogs.user_id = auth.uid()))`,
    `DROP POLICY IF EXISTS "Users can view achievements for their dogs" ON achievements`,
    `CREATE POLICY "Users can view achievements for their dogs" ON achievements FOR SELECT USING (EXISTS (SELECT 1 FROM dogs WHERE dogs.id = achievements.dog_id AND dogs.user_id = auth.uid()))`,
    `DROP POLICY IF EXISTS "Users can insert achievements for their dogs" ON achievements`,
    `CREATE POLICY "Users can insert achievements for their dogs" ON achievements FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM dogs WHERE dogs.id = achievements.dog_id AND dogs.user_id = auth.uid()))`,
  ];

  const results: { sql: string; ok: boolean; error?: string }[] = [];

  for (const sql of sqlStatements) {
    // Tentar via query direto
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': serviceRoleKey,
          'Authorization': `Bearer ${serviceRoleKey}`,
        },
        body: JSON.stringify({ sql_query: sql }),
      });
      results.push({ sql: sql.substring(0, 50), ok: res.ok });
    } catch (e: any) {
      results.push({ sql: sql.substring(0, 50), ok: false, error: e.message });
    }
  }

  return NextResponse.json({ results });
}
