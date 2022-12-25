import React from "react";

import { SideBlock } from "../SideBlock";
import List from "@mui/material/List";
import Comment from "./Comment";


export const CommentsBlock = ({ items, children, isLoading = true, isFullPost = false }) => {
// debugger
  return ( 
    <SideBlock title="Комментарии" isFullPost={isFullPost}>
      <List>
        {(isLoading ? [...Array(5)] : items).map((obj, index) => (
          <Comment
            // obj={obj} 
            fullName={obj && obj.user.fullName ? obj.user.fullName : 'fullName'}
            avatarUrl={obj && obj.user.avatarUrl ? obj.user.avatarUrl : 'avatarUrl'}
            text={obj && obj.text ? obj.text : 'text'}
            postId={obj && obj.post._id ? obj.post._id : 'postId'}
            userId={obj && obj.user._id ? obj.user._id : 'userId'}
            id={obj && obj._id ? obj._id : '_id'}
            index={index}
            isLoading={isLoading}
            isFullPost={isFullPost}
          />
        ))}
      </List>
      {children}
    </SideBlock>
  );
};
