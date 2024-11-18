import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Grid, Card, CardContent, CardActions, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ConfirmDialog from './ConfirmDialog';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PostList: React.FC = () => {
  const [posts, setPosts] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/posts').then(response => {
      setPosts(response.data);
    });
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/posts/${id}`);
      setPosts(posts.filter((post: any) => post._id !== id));
      toast.success('Post deleted successfully!');
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  const openConfirmDialog = (id: string) => {
    setSelectedPost(id);
    setOpenConfirm(true);
  };

  const closeConfirmDialog = () => {
    setSelectedPost(null);
    setOpenConfirm(false);
  };

  const confirmDelete = () => {
    if (selectedPost) {
      handleDelete(selectedPost);
      closeConfirmDialog();
    }
  };

  return (
    <Grid container spacing={3}>
      {posts.map((post: any) => (
        <Grid item xs={12} sm={6} md={4} key={post._id}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {post.content}
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton onClick={() => navigate(`/edit/${post._id}`)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => openConfirmDialog(post._id)}>
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
      <ConfirmDialog
        open={openConfirm}
        onClose={closeConfirmDialog}
        onConfirm={confirmDelete}
      />
    </Grid>
  );
};

export default PostList;