import express from 'express';
import cors from 'cors';
import listRoutes from '../routes/list.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/toDoList', listRoutes);

export default app;