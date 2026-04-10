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
  const data = await res.json();
  return { status: res.status, data };
}

async function main() {
  const result = await runQuery(`
    SELECT schemaname, tablename, rowsecurity
    FROM pg_tables
    WHERE schemaname = 'public'
    ORDER BY tablename
  `);
  console.log('RLS Status:', JSON.stringify(result.data, null, 2));

  const policies = await runQuery(`
    SELECT tablename, policyname, cmd, qual
    FROM pg_policies
    WHERE schemaname = 'public'
    ORDER BY tablename, policyname
  `);
  console.log('\nPolicies:', JSON.stringify(policies.data, null, 2));
}

main().catch(console.error);
