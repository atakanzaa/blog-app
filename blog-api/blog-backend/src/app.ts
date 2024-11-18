import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/postRoutes';

const app = express();

// CORS'u etkinleştir
app.use(cors());

// JSON gövde ayrıştırıcıyı kullan
app.use(bodyParser.json());

// API rotalarını kullan
app.use('/api', postRoutes);

// MongoDB'ye bağlan
mongoose.set('bufferCommands', false); // Buffering'i devre dışı bırak
mongoose.connect('mongodb://127.0.0.1:27017/blog')
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

export default app;