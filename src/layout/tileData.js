import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';


export const mailFolderListItems = (
  <div>
    <Link to={"/"}>
        <ListItem button>
            <ListItemIcon>
                    <HomeIcon />        
                </ListItemIcon>
            <ListItemText primary="Home." />
        </ListItem>
    </Link>
      
    <Link to={"/me"}>
    <ListItem button>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary="About Me." />
    </ListItem>
    </Link>
    
    <ListItem button>
      <ListItemIcon>
        <StarIcon />
      </ListItemIcon>
      <ListItemText primary="Posts." />
    </ListItem>
    
    <ListItem button>
      <ListItemIcon>
        <SendIcon />
      </ListItemIcon>
      <ListItemText primary="Talk." />
    </ListItem>
    </div>
);