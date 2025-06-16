const express = require('express');
const router = express.Router();
const matkulController = require('../controllers/mataKuliahControllers');

router.get('/', matkulController.getAllMatkul);
router.get('/:id', matkulController.getMatkulById);
router.post('/', matkulController.createMatkul);

module.exports = router;
