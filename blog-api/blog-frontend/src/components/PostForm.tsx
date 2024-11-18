import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { TextField, Button, Paper, Typography, Box } from '@mui/material';
import { toast } from 'react-toastify';

const PostForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (id) {
      api.get(`/posts/${id}`).then(response => {
        setTitle(response.data.title);
        setContent(response.data.content);
      });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/posts/${id}`, { title, content });
        toast.success('Post updated successfully!');
      } else {
        await api.post('/posts', { title, content });
        toast.success('Post created successfully!');
      }
      navigate('/');
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <Paper style={{ padding: '2rem', marginTop: '2rem' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {id ? 'Edit Post' : 'Create Post'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            fullWidth
            multiline
            rows={4}
          />
        </Box>
        <Button type="submit" variant="contained" color="primary">
          {id ? 'Update' : 'Submit'}
        </Button>
      </form>
    </Paper>
  );
};

export default PostForm;