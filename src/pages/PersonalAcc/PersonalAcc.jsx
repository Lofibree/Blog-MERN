import { Avatar, Button, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Typography, Box, Skeleton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import styles from './PersonalAcc.module.scss'
import { fetchAuthMe, fetchUpdateMe } from '../../redux/slices/auth';
import Modal from '@mui/material/Modal';

const PersonalAcc = () => {

    useEffect(() => {
        dispatch(fetchAuthMe())
    }, [])

    const dispatch = useDispatch()
    const userData = useSelector(state => state.auth.data)
    const [isEdit, setIsEdit] = useState(false)
    const [valueUrl, setValueUrl] = useState('')
    const [valueName, setValueName] = useState('')


    const editProfile = () => setIsEdit(true)
    const onSubmit = () => {
        setIsEdit(false)
        const fields = {
            fullName: valueName,
            avatarUrl: valueUrl
        }
        dispatch(fetchUpdateMe(fields))
    }
    const handleOnChangeUrl = e => setValueUrl(e.target.value)
    const handleOnChangeName = e => setValueName(e.target.value)
    const handleCancel = e => setIsEdit(false)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'fit-content',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 2,
      };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  

    return (
        <div className={styles.container}>
            <div className={styles.profileBox}>
                <div>
                    {userData
                        ? <>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <img src={userData.avatarUrl} className={styles.imgModal}/>
                                </Box>
                            </Modal>
                            <Avatar src={userData.avatarUrl} alt="dfgdfg" onClick={handleOpen} sx={{width: 150, height: 150}} className={styles.avatar} />
                        </>
                        : <Skeleton variant="circular" width={150} height={150} />
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
                            sx={{ m: 2 }}
                            variant="standard"
                            label="Новая ссылка на изображение"
                            value={valueUrl}
                            onChange={handleOnChangeUrl}
                            fullWidth
                        />
                        <TextField
                            sx={{ m: 2 }}
                            variant="standard"
                            label="Новое имя пользователя"
                            value={valueName}
                            onChange={handleOnChangeName}
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
    );
};

export default PersonalAcc;