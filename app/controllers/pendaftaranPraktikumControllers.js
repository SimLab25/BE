const pool = require('../../db');
exports.getAllPendaftaran = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pendaftaran_praktikum');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.createPendaftaran = async (req, res) => {
  const { id_user, kelas, semester, tahun_ajaran } = req.body;
  try {
    const { id_user, nama_praktikum, tanggal_daftar, status, author } = req.body;
await pool.query(
  'INSERT INTO pendaftaran_praktikum (id_user, nama_praktikum, tanggal_daftar, status, author) VALUES ($1, $2, $3, $4, $5)',
  [id_user, nama_praktikum, tanggal_daftar, status, author]
);


    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};