const { Pool } = require('pg');
const pool = require('../../db'); // pastikan koneksi DB sudah benar
const bcrypt = require('bcrypt');

// GET semua user
exports.getAllUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE user baru dengan hash password
exports.createUser = async (req, res) => {
  const { nama, email, password, role } = req.body;

  try {
    // Hash password sebelum disimpan
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await pool.query(
      'INSERT INTO users (nama, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [nama, email, hashedPassword, role]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
