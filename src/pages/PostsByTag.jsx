import React from 'react';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsByTags } from '../redux/slices/posts';
import { useParams } from 'react-router-dom';
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

  return (
    <>
      <Grid container spacing={4}>
        <Grid xs={10} item>
          <Typography variant='h2' m={5} sx={{
            wordBreak: 'break-word',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: {
              xs: 350,
              sm: 500,
              md: 700,
              lg: 900
            }
          }}>{`#${tag}`}</Typography>
          {
            (isPostsLoading ? [...Array(5)] : posts.items)
              .map((obj, index) => isPostsLoading
                ? (<Post isLoading={true} key={index} />)
                : (
                  <Post
                    id={obj._id}
                    title={obj.title}
                    image={obj.image ? obj.image : ''}
                    user={obj.user}
                    createdAt={obj.createdAt.split('T')}
                    updatedAt={obj.updatedAt.split('T')}
                    viewsCount={obj.viewsCount}
                    commentsCount={obj.commentsCount}
                    tags={obj.tags}
                    isEditable={userData?._id === obj.user._id}
                  />
                ))}
        </Grid>
      </Grid>
    </>
  );
};
