import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { Typography, Button } from '@mui/material';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    api.get(`/posts/${id}`).then(response => {
      setPost(response.data);
    });
  }, [id]);

  return post ? (
    <div>
      <Typography variant="h4">{post.title}</Typography>
      <Typography variant="body1">{post.content}</Typography>
      <Button href={`/edit/${post._id}`}>Edit</Button>
    </div>
  ) : (
    <Typography>Loading...</Typography>
  );
};

export default PostDetail;