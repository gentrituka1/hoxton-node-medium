import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

const port = 4000;

app.get('/posts', async (req, res) => {
    const posts = await prisma.post.findMany();
    res.send(posts);
})

app.get('/posts/:id', async (req, res) => {
    const id = Number(req.params.id);
    const post = await prisma.post.findUnique({
        where: { id }
    });
    res.send(post);
})

app.post('/posts', async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: req.body
        })
        res.send(user);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
})



app.patch('/posts/:id', async (req, res) => {
    
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})