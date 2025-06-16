const pool = require('../../db');

// Ambil semua data
exports.getAllPendaftaran = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pendaftaran_praktikum');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Tambah data
exports.createPendaftaran = async (req, res) => {
  const { id_user, nama_praktikum, tanggal_daftar, status, author } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO pendaftaran_praktikum (id_user, nama_praktikum, tanggal_daftar, status, author) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [id_user, nama_praktikum, tanggal_daftar, status, author]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Hapus data berdasarkan ID
exports.deletePendaftaran = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await pool.query('DELETE FROM pendaftaran_praktikum WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Data tidak ditemukan' });
    }

    res.status(200).json({ message: 'Data berhasil dihapus', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
