const pool = require('../../db'); // pastiin path-nya bener
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { nama, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE nama = $1', [nama]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'User tidak ditemukan' });
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Password salah' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'SECRET_KEY', {
      expiresIn: '1d',
    });

    res.status(200).json({
      message: 'Login berhasil',
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
};

module.exports = { login };
