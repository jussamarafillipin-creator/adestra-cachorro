const ACCESS_TOKEN = 'sbp_30fecfd577aa758c9b3148df8e8811eb10952ece';
const PROJECT_REF = 'morkqdnrwvnddxxxwptd';

async function runQuery(query) {
  const res = await fetch(`https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });
  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { data = text; }
  return { status: res.status, data };
}

const policies = [
  // dogs
  `CREATE POLICY "dogs_select" ON dogs FOR SELECT TO authenticated USING (auth.uid() = user_id)`,
  `CREATE POLICY "dogs_insert" ON dogs FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id)`,
  `CREATE POLICY "dogs_update" ON dogs FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id)`,
  `CREATE POLICY "dogs_delete" ON dogs FOR DELETE TO authenticated USING (auth.uid() = user_id)`,

  // training_plans
  `CREATE POLICY "training_plans_select" ON training_plans FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM dogs WHERE dogs.id = training_plans.dog_id AND dogs.user_id = auth.uid()))`,
  `CREATE POLICY "training_plans_insert" ON training_plans FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM dogs WHERE dogs.id = training_plans.dog_id AND dogs.user_id = auth.uid()))`,
  `CREATE POLICY "training_plans_update" ON training_plans FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM dogs WHERE dogs.id = training_plans.dog_id AND dogs.user_id = auth.uid()))`,
  `CREATE POLICY "training_plans_delete" ON training_plans FOR DELETE TO authenticated USING (EXISTS (SELECT 1 FROM dogs WHERE dogs.id = training_plans.dog_id AND dogs.user_id = auth.uid()))`,

  // training_sessions
  `CREATE POLICY "sessions_select" ON training_sessions FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM dogs WHERE dogs.id = training_sessions.dog_id AND dogs.user_id = auth.uid()))`,
  `CREATE POLICY "sessions_insert" ON training_sessions FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM dogs WHERE dogs.id = training_sessions.dog_id AND dogs.user_id = auth.uid()))`,
  `CREATE POLICY "sessions_update" ON training_sessions FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM dogs WHERE dogs.id = training_sessions.dog_id AND dogs.user_id = auth.uid()))`,
  `CREATE POLICY "sessions_delete" ON training_sessions FOR DELETE TO authenticated USING (EXISTS (SELECT 1 FROM dogs WHERE dogs.id = training_sessions.dog_id AND dogs.user_id = auth.uid()))`,

  // achievements
  `CREATE POLICY "achievements_select" ON achievements FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM dogs WHERE dogs.id = achievements.dog_id AND dogs.user_id = auth.uid()))`,
  `CREATE POLICY "achievements_insert" ON achievements FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM dogs WHERE dogs.id = achievements.dog_id AND dogs.user_id = auth.uid()))`,
  `CREATE POLICY "achievements_update" ON achievements FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM dogs WHERE dogs.id = achievements.dog_id AND dogs.user_id = auth.uid()))`,
  `CREATE POLICY "achievements_delete" ON achievements FOR DELETE TO authenticated USING (EXISTS (SELECT 1 FROM dogs WHERE dogs.id = achievements.dog_id AND dogs.user_id = auth.uid()))`,
];

async function main() {
  console.log(`Criando ${policies.length} políticas RLS...\n`);
  for (const sql of policies) {
    const r = await runQuery(sql);
    const ok = r.status === 201 || r.status === 200;
    console.log(ok ? '✓' : '✗', sql.substring(0, 60), ok ? '' : `=> ${JSON.stringify(r.data)}`);
  }
  console.log('\nConcluído!');
}

main().catch(console.error);
