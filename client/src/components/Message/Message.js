import React from "react";
import { Comment } from "semantic-ui-react";

const isOwnMessage = (message, user) => {
  return message.user.id === user.uid ? "message__self" : "";
};

const Message = ({ message, user }) => (
  <Comment>
    <Comment.Avatar src={message.user.avatar} />
    <Comment.Content className={isOwnMessage(message, user)}>
      <Comment.Author style={{ color: "white" }} as="a">
        {message.user.name}
      </Comment.Author>
      <Comment.Text style={{ color: "white" }}>{message.content} </Comment.Text>
    </Comment.Content>
  </Comment>
);

export default Message;
