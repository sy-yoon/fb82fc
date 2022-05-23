import React from 'react';
import { Box, Badge, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: 'bold',
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    fontWeight: 400,
    color: '#9CADC8',
    letterSpacing: -0.17,
  },
  previewBoldText: {
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: -0.17,
  },
  unread:{
    '& .MuiBadge-badge': {
      fontSize: '10px',
      background: '#3F92FF',
      color: '#ffffff',
      right: 0,
      marginRight: '30px',    
      top: 0,
      padding: '0',
    },
  }
}));


const ChatContent = ({ conversation }) => {
  const classes = useStyles();

  const { otherUser } = conversation;
  const latestMessageText = conversation.id && conversation.latestMessageText;
  const unReadMessage = conversaion.messages[conversaion.messages.length-1].id - conversation.readMessageId;
  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={(unReadMessage>0) ? classes.previewBoldText : classes.previewText} >
          {latestMessageText}
        </Typography>
      </Box>
      { (unReadMessage>0) && <Badge badgeContent={unReadMessage} color="secondary" className={classes.unread}/> }
    </Box>
  );
};

export default ChatContent;
