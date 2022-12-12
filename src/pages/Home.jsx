import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock/TagsBlock';
import { CommentsBlock } from '../components/Comments/CommentsBlock';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchLastTags, fetchPopularTags, fetchPopularPosts, fetchSearchedPosts } from '../redux/slices/posts';
import { Link, useLocation } from 'react-router-dom';
import { fetchLastComments } from '../redux/slices/comments';
import { Autocomplete, TextField } from '@mui/material';
import { Box } from '@mui/system';




export const Home = () => {


  const dispatch = useDispatch()
  const location = useLocation()
  const userData = useSelector(state => state.auth.data)
  const { posts, tags } = useSelector(state => state.posts)
  
  const lastComments = useSelector(state => state.comments.comments)
  const [activeTab, setActiveTab] = useState(0)
  const [tagsTitle, setTagsTitle] = useState(true)
  const [value, setValue] = useState('')

  const isPostsLoading = posts.status === 'loading'
  const isTagsLoading = posts.status === 'loading'
  const isCommLoading = lastComments.status === 'loading'


  React.useEffect(() => {
    if (location.pathname === '/posts/popular') {
      setActiveTab(1)
      setTagsTitle(true)
      dispatch(fetchPopularPosts())
      dispatch(fetchPopularTags())
      dispatch(fetchLastComments())
    }
    if (location.pathname === '/posts/new') {
      setActiveTab(0)
      setTagsTitle(false)
      dispatch(fetchPosts())
      dispatch(fetchLastTags())
      dispatch(fetchLastComments())
    }
  }, [location.pathname])

  const getOptions = () => {
    const options = posts.items.map((p) => {
      return {label: p.title, author: p.user.fullName}
    })
    console.log(options)
    return options
  }

  const handleOnChange = (e, newValue) => {
    setValue(newValue)
    console.log(newValue)
    if (newValue) {
      const fields = {
        title: newValue.label
      }
      dispatch(fetchSearchedPosts(fields))
    }
  }

  return (
    <>
      <Box sx={{ display: 'flex', marginBottom: 1 }}>
        <Tabs style={{ marginBottom: 15, marginRight: 15 }} value={activeTab} aria-label="basic tabs example">
          <Link to='/posts/new' style={{ outline: 'none', textDecoration: 'none', color: 'black' }}><Tab label="Новые" /></Link>
          <Link to='/posts/popular' style={{ outline: 'none', textDecoration: 'none', color: 'black' }}><Tab label="Популярные" /></Link>
        </Tabs>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={getOptions().sort((a, b) => b.author.localeCompare(a.author))}
          value={value}
          onChange={handleOnChange}
          sx={{ width: 300 }}
          groupBy={(option) => option.author}
          renderInput={(params) =>
            <TextField
              {...params}
              label="Поиск по заголовкам статей"
            />
          }
        />
      </Box>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {
            (isPostsLoading ? [...Array(5)] : posts.items)
              .map((obj, index) => isPostsLoading
                ? <Post isLoading={true} key={index} />
                : 
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
                    isEditable={userData?._id === obj.user._id}
                    isOnline={userData?.isOnline}
                  />
                )}
        </Grid>
        <Grid xs={4} item>
          <>
            <TagsBlock items={tags.items} isLoading={isTagsLoading} title={tagsTitle} />
            <CommentsBlock items={lastComments.items} isLoading={isCommLoading}  />
          </>
        </Grid>
      </Grid>
    </>
  );
};
