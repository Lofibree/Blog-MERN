import { Avatar, Button, Grid, Link, TextField } from '@mui/material';
import React from 'react';
import { Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import styles from './PersonalAcc.module.scss'
import { useState } from 'react';
import { fetchAuthMe, fetchUpdateMe } from '../../redux/slices/auth';
import { useEffect } from 'react';
import {Box} from '@mui/material';
import {Skeleton} from '@mui/material';
// import LoadingButton from '@mui/';

const PersonalAcc = () => {

    useEffect(() => {
        dispatch(fetchAuthMe())
    }, [])
    const dispatch = useDispatch()
    const userData = useSelector(state => state.auth.data)
    const [isEdit, setIsEdit] = useState(false)
    const [valueUrl, setValueUrl] = useState('')
    const [valueName, setValueName] = useState('')

   
    const editProfile = () => {
        setIsEdit(true)
    }
    const onSubmit = () => {
        setIsEdit(false)
        const fields = {
            avatarUrl: valueUrl
        }
        dispatch(fetchUpdateMe(fields))
    }
    const handleOnChange = (e) => {
        setValueUrl(e.target.value)
    }
    const handleCancel = (e) => {
        setIsEdit(false)
    }

    return (
        // <Grid container spacing={2}>
        <div className={styles.container}>
            <div className={styles.profileBox}>
                <div>
                    {userData
                        ? <Avatar src={userData.avatarUrl} sx={{ width: 100, height: 100 }} alt="dfgdfg" />
                        : <Skeleton variant="circular" width={100} height={100} />
                    }
                </div>
                <div >
                    {userData
                        ? <Typography variant='h2' m={0}>{userData.fullName}</Typography>
                        : <Skeleton variant="text" width={300} height={70} />
                    }
                </div>
                <div>
                    {isEdit
                        ? ''
                        : <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={editProfile}>Редактировать</Button>
                    }
                </div>
            </div>
            <div className={styles.editBox}>
                {isEdit
                    ?
                    <>
                        <TextField
                            // helperText="Новая ссылка"
                            variant="standard"
                            // placeholder="Заголовок статьи..."
                            label="Новая ссылка на изображение"
                            value={valueUrl}
                            onChange={handleOnChange}
                            fullWidth
                        />
                        <TextField
                            variant="standard"
                            label="Новое имя пользователя"
                            value={valueName}
                            onChange={handleOnChange}
                            fullWidth
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button variant="outlined" color="secondary" sx={{ m: 2 }} size='small' onClick={onSubmit}>Подтвердить</Button>
                            <Button variant="outlined" color="error" sx={{ m: 2 }} size='small' onClick={handleCancel}>Отмена</Button>
                        </Box>
                    </>
                    : ''
                }
            </div>
        </div>
        // </Grid>
    );
};

export default PersonalAcc;