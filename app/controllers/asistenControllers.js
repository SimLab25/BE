const db = require('../../db');

// Ambil semua pendaftaran asisten + nama user
const getAllAsisten = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT asisten_praktikum.*, users.nama AS nama_user 
      FROM asisten_praktikum 
      JOIN users ON asisten_praktikum.id_user = users.id
    `);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Tambah pendaftaran asisten
const addAsisten = async (req, res) => {
  const { id_user, semester, status, alasan } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO asisten_praktikum (id_user, semester, status, alasan) VALUES ($1, $2, $3, $4) RETURNING *',
      [id_user, semester, status, alasan]
    );
    res.status(201).json({ message: 'Pendaftaran asisten berhasil ditambahkan', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update pendaftaran asisten
const updateAsisten = async (req, res) => {
  const { id } = req.params;
  const { semester, status, alasan } = req.body;
  try {
    const result = await db.query(
      'UPDATE asisten_praktikum SET semester = $1, status = $2, alasan = $3 WHERE id = $4 RETURNING *',
      [semester, status, alasan, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Data tidak ditemukan' });
    }
    res.status(200).json({ message: 'Data berhasil diupdate', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Hapus pendaftaran asisten
const deleteAsisten = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM asisten_praktikum WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Data tidak ditemukan' });
    }
    res.status(200).json({ message: 'Data berhasil dihapus', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllAsisten,
  addAsisten,
  updateAsisten,
  deleteAsisten
};
