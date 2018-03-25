"use strict";

const fs = require('fs');
const path = require('path');
const jsyaml = require('js-yaml');
const swaggerTools = require('swagger-tools');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {serveClient: true});

const setupMiddlewares = require('./middlewares');
const connectToSocket = require('./sockets');
const connectToDatabase = require('./db/index');
const router = require('./router');
const validatorOptions = require('./services/validation');
const port = process.env.PORT || 3005;

global.AppBase = __dirname;
module.exports = app; // export for tests


// Setup Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator(validatorOptions));
app.use('/static', express.static('build/static'));

app.use('/api/', router);

app.get('/', (req, res) => {
  const fileDirectory = path.resolve(__dirname, '..', 'build/');
  res.sendFile('index.html', {root: fileDirectory}, (err) => {
    res.end();
    if (err) throw(err);
  });
})

// Swagger INIT
const spec = fs.readFileSync(path.join(__dirname,'../api/swagger/swagger.yaml'), 'utf8');
const swaggerDoc = jsyaml.safeLoad(spec);
const options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './controllers')
};

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

  app.use(middleware.swaggerMetadata());
  app.use(middleware.swaggerValidator());
  app.use(middleware.swaggerRouter(options));
  app.use(middleware.swaggerUi());

  connectToSocket(io);
  connectToDatabase(server, port);
});
