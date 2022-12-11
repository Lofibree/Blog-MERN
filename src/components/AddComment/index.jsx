import React, { useState } from "react";

import styles from "./AddComment.module.scss";

import { useSelector, useDispatch } from "react-redux";
import { createComment } from "../../redux/slices/comments";
import { TextField, Avatar, Button, Badge } from "@mui/material";




export const AddComment = ({ id, isAuth }) => {

  const [value, setValue] = useState('')
  const [isValid, setIsValid] = useState(true)
  const [helperText, setHelperText] = useState('')
  const avatarUrlOfAuthor = useSelector(state => state.auth.data.avatarUrl)
  const dispatch = useDispatch()


  const onSubmit = () => {
    console.log(value)
    if (value) {
      let fields = {
        text: value,
        postId: id
      }
      if (isValid) {
        dispatch(createComment(fields))
        setValue('')
      }
    }
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


  return (
    <>
      <div className={styles.root}>
        <div>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
            color='success'
            classes={{ root: styles.avatar }}
          >
            <Avatar src={avatarUrlOfAuthor} />
          </Badge>
        </div>
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            error={!isValid}
            value={value}
            helperText={helperText}
            onChange={handleOnChange}
            fullWidth
          />
          <Button variant="contained" onClick={onSubmit}>Отправить</Button>
        </div>
      </div>
    </>
  );
};
