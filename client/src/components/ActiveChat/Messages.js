import React from 'react';
import { Box } from '@material-ui/core';
import { SenderBubble, OtherUserBubble } from '.';
import moment from 'moment';


const Messages = (props) => {
  const { messages, otherUser, userId } = props;

  const lastReadMessageId = React.useMemo( () =>{
    for(let i=messages.length-1; i>=0; i--){
      if(messages[i].id <= otherUser.readMessageId && userId === messages[i].senderId){
        return messages[i].id;
      }
    }  
    return 0;    
  }, [messages, otherUser, userId]);

  //const a = lastReadMessageId();
  //console.log(a);
  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format('h:mm');

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} otherUser={otherUser} isLastReadMessage={lastReadMessageId === message.id} />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
          />
        );
      })}
    </Box>
  );
};

export default Messages;
