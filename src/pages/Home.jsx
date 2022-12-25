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

// debugger
  const location = useLocation()
  const dispatch = useDispatch()
  const userData = useSelector(state => state.auth.data)
  const { posts, tags } = useSelector(state => state.posts)
  const lastComments = useSelector(state => state.comments.comments)
  
  const isPostsLoading = posts.status === 'loading'
  const isTagsLoading = tags.status === 'loading'
  const isCommLoading = lastComments.status === 'loading'

  const [activeTab, setActiveTab] = useState(0)
  const [tagsTitle, setTagsTitle] = useState(true)
  const [value, setValue] = useState('')

  

  React.useEffect(() => {
    try {
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
         dispatch(fetchPosts()).then(() => {
          dispatch(fetchLastTags()).then(() => {
            dispatch(fetchLastComments()) 
          })
         })
      }
    } catch (err) {
      console.warn(err)
      alert('Не удалось получить новости/теги/комментарии')
    }
  }, [location.pathname])

  const getOptions = () => {
    try {
      // debugger
      if (!isPostsLoading && posts.items.length !== 0) {
        // debugger
        const options = posts.items.map((p) => {
          // debugger
          return { label: p.title, author: p.user.fullName }
        })
        // console.log(options)
        return options.sort((a, b) => b.author.localeCompare(a.author))
      } else {
        // debugger
        return [{ label: 'dfd', author: 'sdfsdf' }]
      }
    } catch (err) {
      console.log(err)
      alert('Не удалось сделать опции')
    }
  }

  const handleOnChange = (e, newValue) => {
    setValue(newValue)
    if (newValue) {
      const fields = {
        title: newValue.label
      }
      dispatch(fetchSearchedPosts(fields))
    }
    if (newValue === null) {
      dispatch(fetchPosts())
    }
  }

  return (
    <>
      <Box sx={{ display: 'flex', marginBottom: 1 }}>
        <Tabs style={{ marginBottom: 15, marginRight: 15 }} value={activeTab} aria-label="basic tabs example">
          <Link to='/posts/new' style={{ outline: 'none', textDecoration: 'none', color: 'black' }}><Tab label="Новые" /></Link>
          <Link to='/posts/popular' style={{ outline: 'none', textDecoration: 'none', color: 'black' }}><Tab label="Популярные" /></Link>
        </Tabs>
        {isPostsLoading
        ? '' 
        : <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={getOptions()}
        value={value}
        onChange={handleOnChange}
        sx={{ width: {sm: 300, xs: 200} }}
        groupBy={(option) => option.author}
        renderInput={(params) =>
          <TextField
            {...params}
            label="Поиск по заголовкам статей"
            size='small'
          />
        }
      /> 
        }
      </Box>
      <Grid container spacing={{sm: 4, xs: 2}}>
        <Grid xs={8} item>
          {
            (isPostsLoading ? [...Array(5)] : posts.items)
              .map((obj, index) => isPostsLoading
                ? <Post isLoading={true} key={index} />
                : 
                  <Post
                    id={obj._id}
                    title={obj.title}
                    imageUrl={obj.image ? obj.image.data : ''}
                    user={obj.user}
                    createdAt={obj.createdAt.split('T')}
                    updatedAt={obj.updatedAt.split('T')}
                    viewsCount={obj.viewsCount}
                    commentsCount={obj.commentsCount}
                    tags={obj.tags}
                    isEditable={userData?._id === obj.user._id}
                    isOnline={userData?.isOnline && userData._id === obj.user._id}
                  />
                )}
        </Grid>
        <Grid xs={4} item>
          <>
          {/* {
            isTagsLoading 
                ? ''
                :  */}
                {/* <TagsBlock items={tags.items} isLoading={isTagsLoading} title={tagsTitle} /> */}
                {/* } */}
            <TagsBlock items={tags.items} isLoading={isTagsLoading} title={tagsTitle} />
            <CommentsBlock items={lastComments.items} isLoading={isCommLoading} />
          </>
        </Grid>
      </Grid>
    </>
  );
};
