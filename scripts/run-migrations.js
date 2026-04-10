const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

async function runMigrations() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log('Conectado ao banco de dados!');

    const sqlFile = path.join(__dirname, '../supabase/migrations/20260204030121_setup_database.sql');
    const sql = fs.readFileSync(sqlFile, 'utf8');

    // Executar cada statement separadamente para evitar erros parciais
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    for (const statement of statements) {
      try {
        await client.query(statement);
        console.log('OK:', statement.substring(0, 60) + '...');
      } catch (err) {
        // Ignorar erros de "já existe" (tabelas/políticas duplicadas)
        if (err.code === '42P07' || err.code === '42710' || err.message.includes('already exists')) {
          console.log('Já existe (ok):', statement.substring(0, 60) + '...');
        } else {
          console.error('Erro:', err.message);
          console.error('SQL:', statement.substring(0, 100));
        }
      }
    }

    console.log('\nMigrações concluídas com sucesso!');
  } catch (err) {
    console.error('Erro de conexão:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigrations();
