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
                    imageUrl={obj.imageUrl ? `http://localhost:4000${obj.imageUrl}` : ''}
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
        {/* <Grid xs={4} item> */}
          {/* <TagsBlock items={tags.items} isLoading={isTagsLoading} /> */}
          {/* <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          /> */}
        {/* </Grid> */}
      </Grid>
    </>
  );
};
