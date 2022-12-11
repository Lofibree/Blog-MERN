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

export const AddPost = () => {


  const isAuth = useSelector(selectIsAuth)
  const navigate = useNavigate()
  const { id } = useParams()

  const [isLoading, setIsLoading] = React.useState(false);
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const [inputUrl, setInputUrl] = React.useState('');
  const inputFileRef = useRef(null)

  const isEditing = Boolean(id)

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData()
      const file = event.target.files[0]
      formData.append('image', file)
      const { data } = await axios.post('upload', formData)
      console.log(data)
      setImageUrl(data.url)
    } catch (err) {
      console.warn(err)
      alert('Ошибка при загрузке файла')
    }
  };

  const onClickRemoveImage = () => setImageUrl('')

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => { // мб сделать через redux
    try {
      setIsLoading(true)
      const fields = {
        title,
        imageUrl,
        tags: tags.split(',').filter(t => ((t.indexOf(' ') === -1) && (t.indexOf(',') === -1))), // исключаю теги с лишней ',' и пробелом
        text
      }
      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post('/posts', fields)
      const _id = isEditing ? id : data._id
      navigate(`/posts/${_id}`)
    } catch (err) {
      console.warn(err)
      alert('Ошибка при создании статьи')
    }
  }

  useEffect(() => {
    if (id) {
      axios.get(`/posts/${id}`).then(({ data }) => {
        setTitle(data.title)
        setText(data.text)
        setImageUrl(data.imageUrl)
        setTags(data.tags.join(','))
      }).catch(err => {
        console.warn(err)
        alert('Ошибка при получении статьи')
      })
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


  return (
    <Paper style={{ padding: 30 }}>
      <Button variant="outlined" sx={{ mr: 5}} size="large" onClick={() => inputFileRef.current.click()}>
        Загрузить превью
      </Button>
      <span>или</span>
      <TextField
        label="Ссылка на изображение"
        sx={{ml: 5, mr: 5, width: 200}}
        variant="standard"
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
      />
      <Button variant="outlined" size="small" sx={{width: 70, fontSize: 10}} onClick={() => setImageUrl(inputUrl)}>
        Загрузить по ссылке
      </Button>
      <input type="file" onChange={handleChangeFile} ref={inputFileRef} hidden />
      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Удалить
          </Button>
          <img className={styles.image} src={imageUrl.indexOf('http') !== -1
            ? imageUrl
            : `http://localhost:4000${imageUrl}`
          }
            alt="Uploaded"
          />
        </>
      )}
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
