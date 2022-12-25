import React from 'react';
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import { Link } from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { removeComment } from '../../redux/slices/comments';
import { Badge, Button, TextField } from '@mui/material';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { updateComment } from '../../redux/slices/comments';
import style from './Comment.module.scss'

const Comment = ({
  fullName,
  avatarUrl,
  text,
  postId,
  id,
  userId,
  index,
  isLoading,
  isFullPost
}) => {
  // debugger
  const dispatch = useDispatch()
  const userData = useSelector(state => state.auth.data)
  const [isEdit, setIsEdit] = useState(false)
  const [value, setValue] = useState('')
  const [helperText, setHelperText] = useState('')
  const [isValid, setIsValid] = useState(true)

  const isOnline = Boolean(userData?.isOnline && userData._id === userId)

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
            {isLoading
              ?
              <Skeleton variant="circular" width={40} height={40} />
              : <>
                {isOnline
                  ?
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                    color='success'
                  >
                    <Avatar alt={fullName} src={avatarUrl} />
                  </Badge>
                  : <Avatar alt={fullName} src={avatarUrl} />
                }
              </>
            }
          </ListItemAvatar>
          {isLoading ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {isFullPost
                ? <>
                  <Skeleton variant="text" height={25} width={120} />
                  <Skeleton variant="text" height={18} width={230} />
                </>
                : <>
                  <Skeleton variant="text" height={25} width={60} />
                  <Skeleton variant="text" height={18} width={115} />
                </>
              }
            </div>
          ) : (
            <>
              {isFullPost
                ? <ListItemText
                  primary={fullName}
                  secondary={text}
                  // sx={{ width: '80px' }}
                  primaryTypographyProps={{ style: { wordBreak: 'break-word', width: '' } }}
                />
                : <ListItemText
                  primary={fullName}
                  secondary={text}
                  primaryTypographyProps={{ style: { wordBreak: 'break-word', width: '' } }}
                  secondaryTypographyProps={{
                    style: {
                      wordBreak: 'break-word',
                      width: '',
                      maxWidth: '100px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }
                  }}
                />
              }
            </>
          )}
          {userId && (userData?._id === userId)
            ? (
              <>
                <IconButton
                  onClick={() => handleUpdate(text)}
                  color="primary"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(postId, id)}
                  color="error"
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
              <Button variant="contained" onClick={() => onSubmit(postId, id)}>Обновить</Button>
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