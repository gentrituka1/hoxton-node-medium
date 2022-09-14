import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

const port = 4000;

app.get('/', async (req, res) => {

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})