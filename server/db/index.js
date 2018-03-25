const sqlite3 = require('sqlite3').verbose();
const models = require('./models');
const config = require('../../config/database.json');
const { logInstance } = require('../services/consoleLogs');

module.exports = function(server, port) {
  models.sequelize
    .sync() 
    .then(function() {
      
      logInstance(`Connected to "${config[process.env.NODE_ENV].database}" Database.`)
      server.listen(process.env.PORT || 3005, () => {
        logInstance(`API Server started on port ${port}`);
        logInstance(`Swagger-ui is available on http://localhost:${port}/docs`)
    });
    })
    .catch(function(err) {
      logInstance(`Error: "${err}" `)
    });
}