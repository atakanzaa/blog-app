import { Router } from 'express';
import Post from '../models/post';

const router: Router = Router();

router.post('/posts', async (req, res) => {
  const { title, content } = req.body;
  const newPost = new Post({ title, content });
  await newPost.save();
  res.status(201).json(newPost);
});

router.get('/posts', async (req, res) => {
  const posts = await Post.find();
  res.status(200).json(posts);
});

router.get('/posts/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.status(200).json(post);
});

router.put('/posts/:id', async (req, res) => {
  const { title, content } = req.body;
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
  res.status(200).json(updatedPost);
});

router.delete('/posts/:id', async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default router;