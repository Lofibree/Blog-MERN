import React from "react";

import { Post } from "../components/Post";
import { AddComment } from "../components/AddComment/index.jsx";
import { CommentsBlock } from "../components/Comments/CommentsBlock";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from '../axios.js'
import ReactMarkdown from "react-markdown";
import { useSelector, useDispatch } from "react-redux";
import { fetchComments, createComment } from "../redux/slices/comments";
import { selectIsAuth } from "../redux/slices/auth";


export const FullPost = () => {


  const { id } = useParams();
  const isAuth = useSelector(selectIsAuth)
  const userData = useSelector(state => state.auth.data)

  const comments = useSelector(state => state.comments.comments.items)
  const [data, setData] = useState()
  // const [isEditable, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()



  useEffect(() => {
    axios.get(`/posts/${id}`).then((res) => {
      setData(res.data)
      setIsLoading(false)
      dispatch(fetchComments(id))
    }).catch(err => {
      console.warn(err)
      alert('Ошибка при получении статьи')
    })
  }, [])


  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4000${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt.split('T')}
        updatedAt={data.updatedAt.split('T')}
        viewsCount={data.viewsCount}
        commentsCount={data.commentsCount}
        tags={data.tags}
        isFullPost
      >
        <p>
          {/* <ReactMarkdown children={data.text} /> */}
          {data.text}
        </p>
      </Post>
      <CommentsBlock items={comments} isLoading={isLoading} userId={userData?._id }>
        {isAuth && <AddComment id={id} />}
      </CommentsBlock>
    </>
  );
};
