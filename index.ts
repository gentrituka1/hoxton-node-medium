import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

const port = 5000;

app.get("/posts", async (req, res) => {
  const posts = await prisma.post.findMany({
    include: {
      user: true,
      comments: true,
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });
  res.send(posts);
});

app.get("/posts/:id", async (req, res) => {
  const id = Number(req.params.id);
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      user: true,
      comments: true,
      _count: { select: { likes: true } },
    },
  });
  res.send(post);
});

app.post("/posts", async (req, res) => {
  try {
    const newPost = await prisma.post.create({
      data: req.body,
      include: { user: true, comments: true, likes: true },
    });
    res.send(newPost);
  } catch (error) {
    res.status(404).send({ error: error });
  }
});

app.post("/likes", async (req, res) => {
  // like a post

  try {
    const newLike = await prisma.like.create({
      data: req.body,
      include: { post: true },
    });
    res.send(newLike);
  } catch (error) {
    res.status(404).send({ error: error });
  }
});

app.post("/comments", async (req, res) => {
  // comment on a post

  try {
    const newComment = await prisma.comment.create({
      data: req.body,
      include: { post: true },
    });
    res.send(newComment);
  } catch (error) {
    res.status(404).send({ error: error });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
