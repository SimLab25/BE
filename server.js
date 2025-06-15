const express = require('express');
const cors = require('cors');
const db = require('./db'); // koneksi database
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// const alatRoutes = require('./app/routes/alatRoutes');

const alatRoutes = require('./app/routes/alatRoutes');
const userRoutes = require('./app/routes/userRoutes');
const peminjamanRoutes = require('./app/routes/peminjamanRoutes');
const pendaftaranRoutes = require('./app/routes/pendaftaranRoutes');
app.use("/alat", alatRoutes);
app.use('/users', userRoutes);
app.use('/peminjaman', peminjamanRoutes);
app.use('/pendaftaran', pendaftaranRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server jalan di port ${PORT}`);
});
