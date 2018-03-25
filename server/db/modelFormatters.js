module.exports = {
  messageModelFormatter: function(message) {
    return {
      id: message.id,
      username: message.username,
      content: message.content,
      createdAt: new Date(message.createdAt).toLocaleTimeString()
    }
  }
}