import React, {useState} from 'react';
import clsx from 'clsx';
import {Link} from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Post.module.scss';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';
import { fetchRemovePost } from '../../redux/slices/posts';
import { Modal } from '@mui/material';
import {Box} from '@mui/material';



export const Post = ({
  id,
  title,
  createdAt,
  updatedAt,
  image,
  user,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
  isOnline
}) => {
// debugger

  const dispatch = useDispatch()

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  if (isLoading) {
    return <PostSkeleton />;
  }

  const onClickRemove = () => { 
    if (window.confirm('Вы точно хотите удалить статью?')) {
      dispatch(fetchRemovePost(id))
    }
   };


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




  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/edit/${id}`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        {image && (
        <img
          className={styles.imageModal}
          src={
            // `http://localhost:4000/upload/${image}` || 
          `${process.env.REACT_APP_API_URL}/upload/${image}`}
          alt={title}
        />
      )}
        </Box>
      </Modal>
      {image !== '' && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={
            // `http://localhost:4000/upload/${image}` ||
          `${process.env.REACT_APP_API_URL}/upload/${image}`}
          onClick={handleOpen}
          alt={title}
        /> 
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} isOnline={isOnline} isEditable={isEditable} createdAt={createdAt} updatedAt={updatedAt} />
        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h2>
          <ul className={styles.tags}>
            {tags.map((tag) => (
              <li key={tag}>
                <Link to={`/tags/${tag}`}>#{tag}</Link>
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
