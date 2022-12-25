import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import style from './TagsBlock.module.scss'
import { SideBlock } from "../SideBlock";

export const TagsBlock = ({ items, isLoading = true, title = true }) => {
  return (
    <SideBlock title={title ? 'Теги популярных статей' : 'Последние теги'} >
      <List className={style.sideBlock} >
        {(isLoading ? [...Array(5)] : items).map((tag, i) => (
          <>
            <a
              style={{ textDecoration: "none", color: "black", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
              href={`/tags/${tag}`}
            >
              <ListItem key={i} disablePadding sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                <ListItemButton>
                  <ListItemIcon sx={{ minWidth: '35px' }}>
                    <TagIcon />
                  </ListItemIcon>
                  {isLoading
                    ? <Skeleton width={100} />
                    : <ListItemText
                      primary={tag}
                      primaryTypographyProps={{
                        style: {
                          wordBreak: 'break-word',
                          width: '',
                          maxWidth: '100px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }
                      }}
                    />
                  }
                </ListItemButton>
              </ListItem>
            </a>
          </>
        ))}
      </List>
    </SideBlock>
  );
};
