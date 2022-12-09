import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { logout, selectIsAuth } from '../../redux/slices/auth';
import { useDispatch, useSelector } from 'react-redux';
import { ExitToApp, Notes } from '@mui/icons-material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';


export const Header = () => {

  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()
  const onClickLogout = () => {
    if (window.confirm('Вы точно хотите выйти?')) {
      dispatch(logout())
      window.localStorage.removeItem('token')
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/posts/new">
            <div>BRYTKOV BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth
              ? (<>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>Меню</Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    <Link to="/add-post">
                      <Button variant="contained" size='small' startIcon={<Notes />}>
                        Написать статью
                      </Button>
                    </Link>
                  </MenuItem >
                  <MenuItem onClick={handleClose}>
                    <Link to="/personal/me">
                      <Button variant="contained" size='small' startIcon={<AccountBoxIcon />}>
                        Личный кабинет
                      </Button>
                    </Link>
                  </MenuItem>
                </Menu>
                <Button onClick={onClickLogout} size='small' variant="contained" color="error" endIcon={<ExitToApp />}>
                  Выйти
                </Button>
              </>)
              : (<>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>)
              }
          </div>
        </div>
      </Container>
    </div>
  );
};
