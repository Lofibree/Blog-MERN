import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form'
import { fetchAuth, fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import { useNavigate, Navigate } from "react-router-dom";

import styles from './Login.module.scss';

export const Registration = () => {

  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()

  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      fullName: 'chel',
      email: 'chel@test.ru',
      password: '1234'
    },
    mode: 'all'
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values))

    if (!data.payload) {
      alert('Не удалось зарегистрироваться')
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
      // console.log(window.localStorage)
    }
  }

  if (isAuth) {
    return <Navigate to='/posts/new' />
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="Полное имя"
          type='text'
          error={Boolean(errors.fullName?.message)}
          {...register('fullName', { required: 'Укажите имя' })}
          helperText={errors.fullName?.message}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="E-Mail"
          type='email'
          error={Boolean(errors.email?.message)}
          {...register('email', { required: 'Укажите почту' })}
          helperText={errors.email?.message}
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
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
