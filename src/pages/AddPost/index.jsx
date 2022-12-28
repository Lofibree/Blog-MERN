import React, { useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from "../../redux/slices/auth";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from '../../axios.js'
import { CircularProgress, LinearProgress, Modal } from '@mui/material';
import { Box } from '@mui/system';
import { fetchCreatePost, fetchOnePost, fetchUpdatePost } from '../../redux/slices/posts';

export const AddPost = () => {


  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)
  // const post = useSelector(state => state.posts.posts.items)
  const isPostCreated = useSelector(state => state.posts.posts.status)
  const navigate = useNavigate()
  const { id } = useParams()
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [imageId, setImageId] = React.useState('');
  const [inputUrl, setInputUrl] = React.useState('');
  const [isLoadingImg, setIsLoadingImg] = React.useState(false);
  const [loadingPercent, setLoadingPercent] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const inputFileRef = useRef(null)
  const isEditing = Boolean(id)

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData()
      const file = event.target.files[0]
      if (file.size < 1024 * 1024) {
        formData.append('image', file)
        formData.append('postId', id)
        setIsLoadingImg(true)
        const { data } = await axios.post('/upload', formData)
        setIsLoadingImg(false)
        setImageId(data)
        handleClose()
      } else {
        alert('Слишком большой файл')
      }
    } catch (err) {
      console.warn(err)
      alert('Ошибка при загрузке файла')
    }
  };

  const onClickRemoveImage = async () => {
    try {
      // debugger
      const { data } = await axios.delete(`/upload/${imageId}`)
      setImageId('')
    } catch (err) {
      console.warn(err)
      alert('Ошибка при удалении файла')
    }
  }
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onChange = React.useCallback((value) => { setText(value) }, []);

  const onSubmit = async () => { // мб сделать через redux // не 
    try {
      const fields = {
        title,
        tags: tags.split(',').filter(t => ((t.indexOf(' ') === -1) && (t.indexOf(',') === -1))), // исключаю теги с лишней ',' и пробелом
        text,
        image: imageId
      }
      if (isEditing) {
        await axios.patch(`/posts/edit/${id}`, fields)
        navigate(`/posts/${id}`)
      } else if (!isEditing) {
        dispatch(fetchCreatePost(fields)).unwrap().then((data) => {
          const _id = isPostCreated === 'loaded' ? data._id : 'postId'
          navigate(`/posts/${_id}`)
        })
      }
    } catch (err) {
      console.warn(err)
      alert('Ошибка при создании статьи')
    }
  }

  useEffect(async () => {
    if (id) {
      try {
        const data = await dispatch(fetchOnePost(id)).unwrap()
        setTitle(data.title)
        setText(data.text)
        setImageId(data.image)
        setTags(data.tags.join(','))
      } catch (err) {
        console.warn(err)
        alert('Ошибка при получении статьи')
      }
    }
  }, [])

  const options = React.useMemo(() => ({
    spellChecker: false,
    maxHeight: '400px',
    autofocus: true,
    placeholder: 'Введите текст...',
    status: false,
    autosave: {
      enabled: true,
      delay: 1000,
    },
  }), [])

  if (!isAuth) {
    return <Navigate to='/posts/new' />
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
    height: '220px',
    minWidth: 'fit-content',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };



  return (
    <Paper style={{ padding: 30 }}>
      {imageId ? (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Удалить
          </Button>
          <img className={styles.image}
            src={
              // `http://localhost:4000/upload/${imageId}` ||
               `${process.env.REACT_APP_API_URL}/${imageId}`}
            alt="Uploaded"
          />
        </>
      )
        : (
          <>
            <Button variant="outlined" sx={{ mr: 5 }} size="large" onClick={handleOpen}>
              Загрузить превью
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Button variant="outlined" sx={{ mb: 3 }} size="large" onClick={() => inputFileRef.current.click()}>
                  Выбрать с ПК
                </Button>
                {isLoadingImg
                  ? <CircularProgress />
                  : ''
                }
              </Box>
            </Modal>
            <input type="file" onChange={handleChangeFile} ref={inputFileRef} hidden />
          </>
        )
      }
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={e => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        value={tags}
        onChange={e => setTags(e.target.value)}
        fullWidth
      />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button size="large" variant="contained" onClick={onSubmit}>
          {isEditing ? 'Редактировать' : 'Опубликовать'}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
