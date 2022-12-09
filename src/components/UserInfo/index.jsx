import { Avatar } from '@mui/material';
import React from 'react';
import styles from './UserInfo.module.scss';

export const UserInfo = ({ avatarUrl, fullName, createdAt }) => {
  return (
    <div className={styles.root}>
      <Avatar src={avatarUrl || '/noavatar.png'} alt={fullName} sx={{mr: 1}}/>
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>Created At</span>
        <span className={styles.additional}>Date: {createdAt[0]}</span>
        <span className={styles.additional}>Time: {createdAt[1].split('.')[0]}</span>
      </div>
    </div>
  );
};
