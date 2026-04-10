const ACCESS_TOKEN = 'sbp_30fecfd577aa758c9b3148df8e8811eb10952ece';
const PROJECT_REF = 'morkqdnrwvnddxxxwptd';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vcmtxZG5yd3ZuZGR4eHh3cHRkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODYwNDA0OCwiZXhwIjoyMDg0MTgwMDQ4fQ.JAsz-l5LJWwlME2ulGzij4VJEgXfuOto5Htnt2fZgXo';
const SUPABASE_URL = 'https://morkqdnrwvnddxxxwptd.supabase.co';

async function main() {
  // 1. Buscar usuário pelo email
  const listRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users?page=1&per_page=50`, {
    headers: {
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
      'apikey': SERVICE_ROLE_KEY,
    },
  });
  const listData = await listRes.json();
  const users = listData.users || [];
  const user = users.find(u => u.email === 'jussamarafillipin@gmail.com');

  if (!user) {
    console.log('Usuário não encontrado. Usuários existentes:');
    users.forEach(u => console.log(' -', u.email, u.id));
    return;
  }

  console.log('Usuário encontrado:', user.email, user.id);

  // 2. Atualizar senha
  const updateRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${user.id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
      'apikey': SERVICE_ROLE_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password: '123456',
      user_metadata: { ...user.user_metadata, role: 'admin' },
      app_metadata: { ...user.app_metadata, role: 'admin' },
    }),
  });
  const updateData = await updateRes.json();
  console.log('Update status:', updateRes.status);
  if (updateRes.status === 200) {
    console.log('✓ Senha alterada para 12345');
    console.log('✓ Role admin definida nos metadados');
  } else {
    console.log('Erro:', JSON.stringify(updateData));
  }
}

main().catch(console.error);
