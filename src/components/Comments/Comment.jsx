import React from 'react';
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import { Link } from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import { useDispatch, useSelector } from "react-redux";
import { removeComment } from '../../redux/slices/comments';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { updateComment } from '../../redux/slices/comments';
import style from './Comment.module.scss'

const Comment = (obj, index, userId, isLoading) => {
  // debugger
  const dispatch = useDispatch()
  const userData = useSelector(state => state.auth.data)
  const [isEdit, setIsEdit] = useState(false)
  const [value, setValue] = useState('')
  const [helperText, setHelperText] = useState('')
  const [isValid, setIsValid] = useState(true)


  const handleDelete = (postId, commentId) => {
    const fields = {
      postId: postId,
      commentId: commentId
    }
    dispatch(removeComment(fields))
  }

  const handleOnChange = (e) => {
    setValue(e.target.value)
    if (value.length < 10) {
      setIsValid(false)
      setHelperText('Минимальная длина: 10')
    } else {
      setIsValid(true)
      setHelperText('')
    }
  }

  const onSubmit = (postId, commentId) => {
    const fields = {
      text: value,
      postId: postId,
      commentId: commentId
    }
    dispatch(updateComment(fields))
    setIsEdit(false)
  }

  const handleUpdate = (text) => {
    setIsEdit(true)
    setValue(text)
  }

  return (
    <div>
      <React.Fragment key={index}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            {isLoading ? (
              <Skeleton variant="circular" width={40} height={40} />
            ) : (
              <Avatar alt={obj.obj ? obj.obj.user.fullName : 'fullName'} src={obj.obj ? obj.obj.user.avatarUrl : ''} />
            )}
          </ListItemAvatar>
          {isLoading ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Skeleton variant="text" height={25} width={120} />
              <Skeleton variant="text" height={18} width={230} />
            </div>
          ) : (
            <ListItemText
              primary={obj.obj ? obj.obj.user.fullName : 'fullName'}
              secondary={obj.obj ? obj.obj.text : 'text'}
              primaryTypographyProps={{ style: { wordBreak: 'break-word', width: '' } }}
            />
          )}
          {obj.obj && (userData?._id === obj.obj.user._id)
            ? (
              <>
                <IconButton
                  onClick={() => handleUpdate(obj.obj.text)}
                  color="secondary"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(obj.obj.post._id, obj.obj._id)}
                  color="secondary"
                >
                  <DeleteIcon />
                </IconButton>
              </>
            )
            : ''
          }
        </ListItem>
        <div className={style.editTextField}>
          {isEdit
            ? <>
              <TextField
                label="Обновить комментарий"
                variant="outlined"
                maxRows={10}
                // className={style.editTextField}
                multiline
                error={!isValid}
                value={value}
                helperText={helperText}
                onChange={handleOnChange}
                fullWidth
              />
              <Button variant="contained" onClick={() => onSubmit(obj.obj.post._id, obj.obj._id)}>Обновить</Button>
            </>
            : ''
          }
        </div>
        <Divider variant="inset" component="li" />
      </React.Fragment>
    </div>
  );
};

export default Comment;