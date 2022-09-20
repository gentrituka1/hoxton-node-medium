import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

const port = 4000;

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
      _count: { select: { likes: true }},
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

app.delete("/posts/:id", async (req, res) => {
  const id = Number(req.params.id);
  const post = await prisma.post.delete({
    where: { id },
  });
  res.send(post);
})

app.get("/likes", async (req, res) => {
  const likes = await prisma.like.findMany({
    include: {
      post: true,
    },
  });
  res.send(likes);
})

app.get("/likes/:id", async (req, res) => {
  const id = Number(req.params.id);
  const likes = await prisma.like.findMany({
    where: { postId: id }
  });
  res.send(likes);
})

app.post("/posts/:id/likes", async (req, res) => {
  
  const id = Number(req.params.id);
  const newLike = await prisma.like.create({
    data: { postId: id },
  });
  const likes = await prisma.like.findMany({
    where: { postId: id }
  })
  res.send(likes);

})

app.get("/comments", async (req, res) => {
  const comments = await prisma.comment.findMany({
    include: {
      post: true,
    },
  });
  res.send(comments);
})

app.get("/comments/:id", async (req, res) => {
  const id = Number(req.params.id);
  const comments = await prisma.comment.findMany({
    where: { postId: id },
  });
  res.send(comments);
})

app.post("/comments", async (req, res) => {
    const newComment = await prisma.comment.create({
        data: req.body,
    });
    res.send(newComment);
});

app.delete("/comments/:id", async (req, res) => {
    const id = Number(req.params.id);
    const comment = await prisma.comment.delete({
        where: { id },
    });
    res.send(comment);
})

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
      posts: true
    },
  });
  res.send(users);
})

app.get("/users/:id", async (req, res) => {
  const id = Number(req.params.id);
  try{
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      posts: true
    }
  });
  res.send(user);
  } catch (error) {
    res.status(404).send({ error: error });
  }
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});