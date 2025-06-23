const pool = require('../../db');

exports.getAllPeminjaman = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT peminjaman.*, users.nama AS nama_user, alat.nama_alat 
      FROM peminjaman 
      JOIN users ON peminjaman.id_user = users.id
      JOIN alat ON peminjaman.id_alat = alat.alat_id
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPeminjaman = async (req, res) => {
  const { id_user, id_alat, tanggal_pinjam, tanggal_kembali, petugas, status_peminjaman } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO peminjaman 
      (id_user, id_alat, tanggal_pinjam, tanggal_kembali, petugas, status_peminjaman) 
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [id_user, id_alat, tanggal_pinjam, tanggal_kembali, petugas, status_peminjaman]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
