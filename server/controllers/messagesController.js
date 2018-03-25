const models = require('../db/models');
const validatorMessages = require('../services/validation/messagesValidation');
const messageModel = models.messages;
const { messageModelFormatter } = require('../db/modelFormatters');

module.exports = {
  getAll(req, res) {
    messageModel.findAll()
      .then(function(messages) {
        let msgs = [];

        messages.forEach(function(msg){
          msgs.push(messageModelFormatter(msg))
        })

        res.send({
          success: true,
          data: msgs
        })
      })
  },

  createMessage(req, res){

    messageModel.create(req.body)
      .then(function(messages) {
        res.send({
          success: true,
          data: messageModelFormatter(messages)
        })
      })
      .catch(function(err){
        res.send({
          success: true,
          data: messageModelFormatter(messages)
        })
      })
  }
}