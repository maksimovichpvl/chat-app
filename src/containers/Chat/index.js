import React, { Component } from 'react';
import io from 'socket.io-client';

import validationUsername from 'services/validation/username';
import validationTypedMessage from 'services/validation/typedMessage.js';
import Message from 'components/Message';
import Button from 'components/Button/index';

import './styles.css';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      typedMessage: '',
      username: '',
      usernameIsChoosen: false,
      messages: [],
      connections: null,
      errors: {}
    }
  }

  componentWillMount() {
    this.initSocket();
    if (localStorage.username) {
      this.setState({
        username: localStorage.username,
        usernameIsChoosen: true
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState || this.props !== nextProps
  }

  initSocket() {
    const socket = io("https://chat-app-23.herokuapp.com/");
    // const socket = io("http://localhost:3005");

    socket.emit('getHistory');

    socket.on('new connection', connections => this.setState({ connections }));

    socket.on('history', messages => {
      this.setState({ messages })
    });

    socket.on('new messege', msg => { 
      const messages = this.state.messages;
      messages.push(msg);
      this.setState({ messages });

      this.refs.chat__container.scrollTo(0, this.refs.chat__container.scrollHeight)
    });

    this.setState({ socket });
  }

  handleChange = (e) => this.setState({[e.target.name]: e.target.value})

  addMessage = () => {
    const { typedMessage, socket, username } = this.state;

    const { errors, isValid } = validationTypedMessage(this.state);

    if (!isValid) {
      this.setState({ errors });
      return;
    }

    const msg = {
      username: username,
      content: typedMessage
    };

    socket.emit('send message', msg);
    this.setState({ typedMessage: '', errors: {} });
  }

  chooseUsername = () => {
    const { errors, isValid } = validationUsername(this.state);

    if (!isValid) {
      this.setState({ errors });
      return;
    }

    localStorage.username = this.state.username;
    
    this.setState({
      username: this.state.username,
      usernameIsChoosen: true,
      errors: {}
    })

    setTimeout(() => this.refs.chat__container.scrollTo(0, this.refs.chat__container.scrollHeight), 0)
  }

  chooseAnotherUsername () {
    localStorage.removeItem('username');
    this.setState({ usernameIsChoosen: false, username: '' });
  }

  render() {
    const { messages, typedMessage, username, usernameIsChoosen, errors, connections } = this.state;

    if (!usernameIsChoosen) {
      return (
        <div className="chat">
          <div className="chat__top">
            {connections ? (
              <span>  
                Online {connections} {connections === 1 ? "user" : "users"}
            </span>
            ) : null}
          </div>

          <div ref="chat__container">
            <div className="row">
              <div className="col-md-9">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Enter your username" 
                  value={username}
                  name="username"
                  onChange={(e) => this.handleChange(e)}
                />
                <span className="chat__errors">{errors.username}</span>
              </div>
              <div className="col-md-3">
                <Button 
                  title={"Confirm"} 
                  onClick={this.chooseUsername} 
                />
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="chat">

        <div className="chat__top">
          {connections ? (
            <span>  
              Online {connections} {connections === 1 ? "user" : "users"}
          </span>
          ) : null}
          <span className="chat__close" onClick={(e) => this.chooseAnotherUsername()}>x</span>
        </div>

        <div className="chat__container" ref="chat__container" >
          {messages.map( message => (
            <Message 
              key={message.id} 
              username={username} 
              message={message} 
            />
          ))}
        </div>

        <div className="row">
          <div className="col-md-9">
            <div className="form-group">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Enter your message" 
                value={typedMessage}
                name="typedMessage"
                onChange={(e) => this.handleChange(e)}
              />
              <span className="chat__errors">{errors.typedMessage}</span>
            </div>
          </div>
          <div className="col-md-3">
            <Button 
              title={'Send'} 
              onClick={this.addMessage} 
            />
          </div>
        </div>
      
      </div>
    );
  }
}

export default Chat;
