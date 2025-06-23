const express = require('express');
const router = express.Router();
const {
  getAllJadwal,
  getJadwalById,
  createJadwal,
  updateJadwal,
  deleteJadwal,
} = require('../controllers/jadwalPraktikumControllers');

router.get('/', getAllJadwal);
router.get('/:id', getJadwalById);
router.post('/', createJadwal);
router.put('/:id', updateJadwal);
router.delete('/:id', deleteJadwal);

module.exports = router;
