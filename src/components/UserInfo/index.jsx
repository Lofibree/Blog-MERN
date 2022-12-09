import React from 'react';
import styles from './UserInfo.module.scss';

export const UserInfo = ({ avatarUrl, fullName, createdAt, updatedAt }) => {
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={avatarUrl || '/noavatar.png'} alt={fullName} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>Created At</span>
        <span className={styles.additional}>Date: {createdAt[0]}</span>
        <span className={styles.additional}>Time: {createdAt[1].split('.')[0]}</span>
        {/* <span className={styles.additional}>Updated At</span>
        <span className={styles.additional}>Date: {updatedAt ? updatedAt[0] : 'date'}</span>
        <span className={styles.additional}>Time: {updatedAt ? updatedAt[1].split('.')[0] : 'time'}</span> */}
      </div>
    </div>
  );
};
