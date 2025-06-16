const pool = require('../../db');

exports.getAllMatkul = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM mata_kuliah');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMatkulById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM mata_kuliah WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Mata kuliah tidak ditemukan' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createMatkul = async (req, res) => {
  const { kode_matkul, nama_matkul, semester, sks } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO mata_kuliah (kode_matkul, nama_matkul, semester, sks) VALUES ($1, $2, $3, $4) RETURNING *',
      [kode_matkul, nama_matkul, semester, sks]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
