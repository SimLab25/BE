const express = require("express"); 
const router = express.Router();

const { getAlat, postAlat, putAlat, deleteAlat } = require("../controllers/alatControllers");

// RESTful style
router.get("/", getAlat);          // GET /alat
router.post("/", postAlat);        // POST /alat
router.put("/:id", putAlat);       // PUT /alat/:id
router.delete("/:id", deleteAlat); // DELETE /alat/:id

module.exports = router;
