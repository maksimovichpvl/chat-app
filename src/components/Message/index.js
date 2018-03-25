import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const addSpecialStyles = (message, username) => 
  message.username === username? "--my" : "--received";

const Message = ({ message, username }) => (
  <div className={`message message${addSpecialStyles(message, username)}`}>
    <div className="message__wrapper">
      <div className={`message__username message${addSpecialStyles(message, username)}`}>
        {message.username}
      </div>
      <div className={`message__msg message__msg${addSpecialStyles(message, username)}`}>
        {message.content}
      </div>
      <div>{message.createdAt}</div>
    </div>
    </div>
);

Message.propTypes = {
  message: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired
};

export default Message;