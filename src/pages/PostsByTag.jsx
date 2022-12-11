import React from 'react';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsByTags } from '../redux/slices/posts';
import {  useParams } from 'react-router-dom';
import { Typography } from '@mui/material';





export const PostsByTag = () => {


  const dispatch = useDispatch()
  const userData = useSelector(state => state.auth.data)
  const { posts } = useSelector(state => state.posts)
  const { tag } = useParams()

  const isPostsLoading = posts.status === 'loading'

  React.useEffect(() => {
    dispatch(fetchPostsByTags(tag))
  }, [tag])

  console.log(posts) 
  console.log(userData) 
  console.log(tag) 
  return (
    <>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          <Typography variant='h2' m={5}>{`#${tag}`}</Typography>
          {
            (isPostsLoading ? [...Array(5)] : posts.items)
              .map((obj, index) => isPostsLoading
                ? (<Post isLoading={true} key={index} />)
                : (
                  <Post
                    id={obj._id}
                    title={obj.title}
                    imageUrl={obj.imageUrl ? obj.imageUrl : ''}
                    user={obj.user}
                    createdAt={obj.createdAt.split('T')}
                    updatedAt={obj.updatedAt.split('T')}
                    viewsCount={obj.viewsCount}
                    commentsCount={obj.commentsCount}
                    tags={obj.tags}
                    isEditable={userData?._id === obj.user._id }
                  />
                ))}
        </Grid>
      </Grid>
    </>
  );
};
