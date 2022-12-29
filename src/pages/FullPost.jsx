import React from "react";

import { Post } from "../components/Post";
import { AddComment } from "../components/AddComment/index.jsx";
import { CommentsBlock } from "../components/Comments/CommentsBlock";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchComments } from "../redux/slices/comments";
import { selectIsAuth } from "../redux/slices/auth";
import { fetchOnePost } from "../redux/slices/posts";


export const FullPost = () => {


  const { id } = useParams();
  const isAuth = useSelector(selectIsAuth)
  const userData = useSelector(state => state.auth.data)
  const posts = useSelector(state => state.posts.posts)
  const isPostsLoading = posts.status === 'loading'

  const comments = useSelector(state => state.comments.comments)
  const isCommLoading = comments.status === 'loading'
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()

// debugger
  useEffect(() => {
    try {
      setIsLoading(true)
      dispatch(fetchOnePost(id)).unwrap().then((res) => {
        dispatch(fetchComments(id))
      }).then(() => {
        // debugger
        // if (posts.items.length !== 0) return 
        setIsLoading(false)
      }).catch(err => {
        console.warn(err)
        alert('Ошибка при получении статьи')
      })
    } catch (err) {
      console.warn(err)
      alert('Ошибка при получении статьи/комментариев')
    }
  }, [])


  // if (isLoading && posts.length === 0 && comments.length === 0) {
  //   // debugger
  //   return <Post isLoading={isLoading} isFullPost />
  // }

  return (
    <>
      {isLoading
        ? <Post isLoading={isLoading} isFullPost />
        :
        <>
          {
            (isPostsLoading && posts.items.length === 0 ? [...Array(5)] : posts.items)
              .map((p, index) => isPostsLoading
                ? <Post isLoading={true} key={index} />
                :
                <Post
                  id={p ? p._id : ''}
                  title={p ? p.title : ''}
                  image={p && p.image ? p.image : ''}
                  user={p ? p.user : ''}
                  createdAt={p && p.createdAt ? p.createdAt.split('T') : ''}
                  updatedAt={p && p.updatedAt ? p.updatedAt.split('T') : ''}
                  viewsCount={p ? p.viewsCount : ''}
                  commentsCount={p ? p.commentsCount : ''}
                  tags={p ? p.tags : ''}
                  isFullPost
                  isOnline={userData?.isOnline && userData._id && p === p.user._id}
                >
                  <p>{p ? p.text : ''}</p>
                </Post>
              )}
          <CommentsBlock items={comments && comments.items ? comments.items : ''} isLoading={isCommLoading} isFullPost>
            {isAuth && <AddComment id={id} isAuth />}
          </CommentsBlock>
        </>
      }
    </>
  );
};
