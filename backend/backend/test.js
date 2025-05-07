const db = require('./db');

async function testConnection() {
  try {
    const res = await db.query('SELECT NOW()');
    console.log('🕒 Current Time:', res.rows[0]);
  } catch (err) {
    console.error('❌ Error running test query:', err.message);
  }
}

testConnection();
