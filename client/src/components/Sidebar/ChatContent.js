import React from 'react';
import { Box, Chip, Typography } from '@material-ui/core';
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
    color: '#9CADC8',
    letterSpacing: -0.17,
  },
  unread: {
    fontSize: '10px',
    background: '#3F92FF',
    borderRadius: '10px',
    height: '20px',
    color: '#ffffff',
    marginRight: '30px',
    
  },
}));

const ChatContent = ({ conversation }) => {
  const classes = useStyles();

  const { otherUser } = conversation;
  const latestMessageText = conversation.id && conversation.latestMessageText;
  const unReadMessage = conversation.messages.filter(
    (message) => message.id > conversation.readMessageId
  ).length;
  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={classes.previewText}>
          {latestMessageText}
        </Typography>
      </Box>
    {
      (()=>{
        if(unReadMessage){
          return(
            <Chip label={unReadMessage} size="small" className={classes.unread} />
          )
        }
        
      })()
    }    
     
    </Box>
  );
};

export default ChatContent;
