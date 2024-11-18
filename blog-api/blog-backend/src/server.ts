import app from './app';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/blog');
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
};

startServer();