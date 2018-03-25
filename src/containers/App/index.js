import React, { Component } from 'react';

import Chat from 'containers/Chat';

import './styles.css';

class App extends Component {

  render() {
    return (
      <div className="app">
        <div className="container">
          <header className="app__header">
            <h2 className="App-title">Chat with React, Express, Socket</h2>
          </header>

          <Chat />
        </div>
      </div>
    );
  }
}

export default App;
