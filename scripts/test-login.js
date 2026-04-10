const SUPABASE_URL = 'https://morkqdnrwvnddxxxwptd.supabase.co';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vcmtxZG5yd3ZuZGR4eHh3cHRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2MDQwNDgsImV4cCI6MjA4NDE4MDA0OH0.SIbgOOrmDQ8C5kT93Hz1HLVV0uUdu-kWqhFGtSTYb9s';

async function main() {
  console.log('Testando login com senha 123456...');
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': ANON_KEY,
    },
    body: JSON.stringify({
      email: 'jussamarafillipin@gmail.com',
      password: '123456',
    }),
  });
  const data = await res.json();
  console.log('Status:', res.status);
  console.log('Resposta:', JSON.stringify(data, null, 2));
}

main().catch(console.error);
