import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock/TagsBlock';
import { CommentsBlock } from '../components/Comments/CommentsBlock';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchLastTags, fetchPopularTags, fetchPopularPosts } from '../redux/slices/posts';
import { Link, useLocation } from 'react-router-dom';
import { fetchLastComments } from '../redux/slices/comments';





export const Home = () => {


  const dispatch = useDispatch()
  const location = useLocation()
  const userData = useSelector(state => state.auth.data)
  const { posts, tags } = useSelector(state => state.posts)
  const lastComments = useSelector(state => state.comments.comments)
  // const status = useSelector(state => state.comments.comments.status)
  const [activeTab, setActiveTab] = useState(0)
  const [tagsTitle, setTagsTitle] = useState(true)
  // const [isLoadingComm, setIsLoadingComm] = useState(true)

  const isPostsLoading = posts.status === 'loading'
  const isTagsLoading = posts.status === 'loading'
  const isCommLoading = lastComments.status === 'loading'

  React.useEffect(() => {
    if (location.pathname === '/posts/popular') {
      // debugger
      setActiveTab(1)
      setTagsTitle(true)
      dispatch(fetchPopularPosts())
      dispatch(fetchPopularTags())
      dispatch(fetchLastComments())
    } 
    if (location.pathname === '/posts/new') {
      // debugger

      setActiveTab(0)
      setTagsTitle(false)
      dispatch(fetchPosts())
      dispatch(fetchLastTags())
      dispatch(fetchLastComments())
    } 
  }, [location])

  // console.log(posts) 
  // console.log(userData) 
  // console.log(location)
  return (
    <>{<><Tabs style={{ marginBottom: 15 }} value={activeTab} aria-label="basic tabs example">
    <Link to='/posts/new' style={{outline: 'none', textDecoration: 'none', color: 'black'}}><Tab label="Новые" /></Link>
    <Link to='/posts/popular' style={{outline: 'none', textDecoration: 'none', color: 'black'}}><Tab label="Популярные" /></Link>
  </Tabs>
  <Grid container spacing={4}>
    <Grid xs={8} item>
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
    <Grid xs={4} item>
      <>
      {/* {isTagsLoading &&  */}
      <TagsBlock items={tags.items} isLoading={isTagsLoading} title={tagsTitle} /> 
      {/* } */}
      {userData?._id && <CommentsBlock items={lastComments.items} isLoading={isCommLoading} userId={userData?._id} />}
      </>
    </Grid>
  </Grid></> || <div>fgdfggdfgdf</div>}
      
    </>
  );
};
