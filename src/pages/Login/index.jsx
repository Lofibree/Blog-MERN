import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";
import styles from "./Login.module.scss";
import { useForm } from 'react-hook-form'
import { useNavigate, Navigate } from "react-router-dom";



export const Login = () => {

  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()

  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: 'test@test.ru',
      password: 'test3454'
    }, 
    mode: 'all'
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values))

    if (!data.payload) {
      alert('Не удалось авторизоваться')
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
      console.log(window.localStorage)
    } 
    // dispatch(fetchAuth(values))
  }

  if (isAuth) {
    return <Navigate to='/posts/new' />
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          type='email'
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message} // если errors.email нету, то не надо доставать message
          {...register('email', { required: 'Укажите почту' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Пароль"
          type='password'
          error={Boolean(errors.password?.message)}
          {...register('password', { required: 'Укажите пароль' })}
          helperText={errors.password?.message} 
          fullWidth
        />
        <Button size="large" disabled={!isValid} type="submit" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
