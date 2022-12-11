import React from "react";

import { SideBlock } from "../SideBlock";
import List from "@mui/material/List";
import Comment from "./Comment";


export const CommentsBlock = ({ items, children, isLoading = true }) => {

  return (
    <SideBlock title="Комментарии">
      <List>
        {(isLoading ? [...Array(5)] : items).map((obj, index) => (
          <Comment obj={obj} index={index} isLoading={isLoading}/>
        ))}
      </List>
      {children}
    </SideBlock>
  );
};
