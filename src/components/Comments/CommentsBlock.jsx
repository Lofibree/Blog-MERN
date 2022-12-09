import React from "react";

import { SideBlock } from "../SideBlock";
import List from "@mui/material/List";
import Comment from "./Comment";


export const CommentsBlock = ({ items, children, isLoading = true, userId = null, isFullPost }) => {

  return (
    <SideBlock title="Комментарии">
      <List>
        {(isLoading ? [...Array(5)] : items).map((obj, index) => (
          <Comment obj={obj} index={index} userId={userId} isLoading={isLoading}/>
        ))}
      </List>
      {children}
    </SideBlock>
  );
};
