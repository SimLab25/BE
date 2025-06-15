const express = require('express');
const router = express.Router();
const pendaftaranController = require('../controllers/pendaftaranPraktikumControllers');

router.get('/', pendaftaranController.getAllPendaftaran);
router.post('/', pendaftaranController.createPendaftaran);

module.exports = router;
