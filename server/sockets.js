"use stict";

const uuidv4 = require('uuid-v4');
const msgModel = require('./db/models').messages;
const { logInstance } = require('./services/consoleLogs');
const { messageModelFormatter } = require('./db/modelFormatters');

module.exports = io => {
    let connections = [];

    io.on('connection', function (socket) {
      connections.push(socket);
      logInstance(`Connected: ${connections.length} sockets connected`);

      io.sockets.emit("new connection", connections.length);

      socket.on('disconnect', function() {
        connections.splice(connections.indexOf(socket), 1);
        io.sockets.emit("new connection", connections.length);
      })

      socket.on('send message', function(content) {
        msgModel.create(content)
          .then( msg => {
              io.sockets.emit("new messege", messageModelFormatter(msg));
            })
          .catch(err => console.error("MessageModel", err))
      });

      socket.on('getHistory', function() {
        msgModel.findAll()
          .then( messages => {
            let msgs = [];

            messages.forEach(function(msg){
              msgs.push(messageModelFormatter(msg)) 
            })

            socket.emit("history", msgs);
          })
          .catch(err => console.error("MessageModel", err))
      })

      socket.on('disconnect', function() {
        connections.splice(connections.indexOf(socket), 1)
      })
    });

};