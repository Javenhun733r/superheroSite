import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import superheroRoutes from './routes/superheroRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5231;

app.use(cors());
app.use(express.json());

app.use('', superheroRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
