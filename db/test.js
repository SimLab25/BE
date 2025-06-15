const db = require('./index');

db.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Koneksi gagal:', err);
  } else {
    console.log('✅ Koneksi berhasil:', res.rows[0]);
  }
  process.exit();
});
