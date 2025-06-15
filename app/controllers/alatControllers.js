const db = require('../../db');

const getAlat = async (req, res, next) => {
    try {
        const result = await db.query('SELECT * FROM alat');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ 
            error: err.message,
            message: "server error" 
        });
    }
} 

const postAlat = async (req, res) => {
    const { nama_alat, spesifikasi, jumlah_total, jumlah_tersedia } = req.body;

    try {
        const result = await db.query(
            'INSERT INTO alat (nama_alat, spesifikasi, jumlah_total, jumlah_tersedia) VALUES ($1, $2, $3, $4) RETURNING *',
            [nama_alat, spesifikasi, jumlah_total, jumlah_tersedia]
        );

        res.status(201).json({
            message: 'Data alat berhasil ditambahkan',
            data: result.rows
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};


const putAlat = async (req, res) => {
    const { id } = req.params;
    const { nama_alat, spesifikasi, jumlah_total, jumlah_tersedia } = req.body;

    try {
        const result = await db.query(
            'UPDATE alat SET nama_alat = $1, spesifikasi = $2, jumlah_total = $3, jumlah_tersedia = $4 WHERE alat_id = $5 RETURNING *',
            [nama_alat, spesifikasi, jumlah_total, jumlah_tersedia, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Alat tidak ditemukan' });
        }

        res.status(200).json({
            message: 'Data alat berhasil diperbarui',
            data: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Delete
const deleteAlat = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query('DELETE FROM alat WHERE alat_id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Alat tidak ditemukan' });
        }

        res.status(200).json({ message: 'Alat berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAlat,
    postAlat,
    putAlat,
    deleteAlat
};
