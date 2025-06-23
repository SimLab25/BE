const express = require('express');
const router = express.Router();

const asistenController = require('../controllers/asistenControllers');

// Gunakan .get/.post dst dengan handler yang pasti ADA
router.get('/', asistenController.getAllAsisten);
router.post('/', asistenController.addAsisten);
router.put('/:id', asistenController.updateAsisten);
router.delete('/:id', asistenController.deleteAsisten);

module.exports = router;