const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vcmtxZG5yd3ZuZGR4eHh3cHRkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODYwNDA0OCwiZXhwIjoyMDg0MTgwMDQ4fQ.JAsz-l5LJWwlME2ulGzij4VJEgXfuOto5Htnt2fZgXo';
const SUPABASE_URL = 'https://morkqdnrwvnddxxxwptd.supabase.co';

async function main() {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/admin/users?page=1&per_page=50`, {
    headers: {
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
      'apikey': SERVICE_ROLE_KEY,
    },
  });
  const data = await res.json();
  const user = (data.users || []).find(u => u.email === 'jussamarafillipin@gmail.com');

  if (user) {
    console.log('Email:', user.email);
    console.log('Email confirmado:', user.email_confirmed_at ? 'SIM' : 'NÃO');
    console.log('Confirmed at:', user.email_confirmed_at);
    console.log('Created at:', user.created_at);
    console.log('App metadata:', JSON.stringify(user.app_metadata));
  }
}

main().catch(console.error);
