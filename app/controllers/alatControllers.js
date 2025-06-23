const db = require('../../db');

// Ambil semua alat
const getAlat = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM alat');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ 
      error: err.message,
      message: "Server error" 
    });
  }
};

// Tambah alat baru
const postAlat = async (req, res) => {
  const { nama_alat, jenis_alat, spesifikasi, tahun_beli, status_alat } = req.body;

  try {
    await db.query(
      'INSERT INTO alat (nama_alat, jenis_alat, spesifikasi, tahun_beli, status_alat) VALUES ($1, $2, $3, $4, $5)',
      [nama_alat, jenis_alat, spesifikasi, tahun_beli, status_alat]
    );
    res.status(201).json({ message: 'Alat berhasil ditambahkan' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update alat berdasarkan ID
const putAlat = async (req, res) => {
  const { id } = req.params;
  const { nama_alat, jenis_alat, spesifikasi, tahun_beli, status_alat } = req.body;

  try {
    const result = await db.query(
      'UPDATE alat SET nama_alat = $1, jenis_alat = $2, spesifikasi = $3, tahun_beli = $4, status_alat = $5 WHERE alat_id = $6 RETURNING *',
      [nama_alat, jenis_alat, spesifikasi, tahun_beli, status_alat, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Alat tidak ditemukan' });
    }

    res.status(200).json({
      message: 'Data alat berhasil diperbarui',
      data: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Hapus alat berdasarkan ID
const deleteAlat = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query('DELETE FROM alat WHERE alat_id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Alat tidak ditemukan' });
    }

    res.status(200).json({ message: 'Alat berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAlat,
  postAlat,
  putAlat,
  deleteAlat
};
