const db = require('../../db'); // atau sesuaikan path

const getAllJadwal = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT jp.*, mk.nama_matkul 
      FROM jadwal_praktikum jp
      JOIN mata_kuliah mk ON jp.id_matkul = mk.id
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getJadwalById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM jadwal_praktikum WHERE id_jadwal = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Jadwal tidak ditemukan' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createJadwal = async (req, res) => {
  const { id_matkul, hari, jam_mulai, jam_selesai, ruangan } = req.body;
  try {
    await db.query(
      `INSERT INTO jadwal_praktikum (id_matkul, hari, jam_mulai, jam_selesai, ruangan) 
       VALUES ($1, $2, $3, $4, $5)`,
      [id_matkul, hari, jam_mulai, jam_selesai, ruangan]
    );
    res.status(201).json({ message: 'Jadwal berhasil ditambahkan' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateJadwal = async (req, res) => {
  const { id } = req.params;
  const { id_matkul, hari, jam_mulai, jam_selesai, ruangan } = req.body;
  try {
    const result = await db.query(
      `UPDATE jadwal_praktikum 
       SET id_matkul = $1, hari = $2, jam_mulai = $3, jam_selesai = $4, ruangan = $5 
       WHERE id_jadwal = $6 RETURNING *`,
      [id_matkul, hari, jam_mulai, jam_selesai, ruangan, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Jadwal tidak ditemukan' });
    res.json({ message: 'Jadwal berhasil diperbarui', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteJadwal = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM jadwal_praktikum WHERE id_jadwal = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Jadwal tidak ditemukan' });
    res.json({ message: 'Jadwal berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllJadwal,
  getJadwalById,
  createJadwal,
  updateJadwal,
  deleteJadwal,
};
