const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const superheroRoutes = require('./routes/superheroRoutes');
const path = require('path');
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5231;
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(cors());
app.use(express.json());

app.use('', superheroRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
