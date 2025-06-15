const express = require('express');
const router = express.Router();
const peminjamanController = require('../controllers/peminjamanControllers');

router.get('/', peminjamanController.getAllPeminjaman);
router.post('/', peminjamanController.createPeminjaman);

module.exports = router;
