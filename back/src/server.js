const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const superheroRoutes = require('./routes/superheroRoutes');
const path = require('path');
const errorHandler = require("./middlewares/errorHandler");
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5231;
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(cors());
app.use(express.json());

app.use('', superheroRoutes);
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
