const express = require('express');
// import routers
const userRouter = require('./users/userRouter');

const server = express();


//custom middleware

function logger(req, res, next) {
  console.log(
    `Request Method: ${req.method} to ${req.url} at [${new Date().toISOString()}]`
    );
    next();
  }
  
// global middleware
server.use(express.json());
server.use(logger);
// use routers with enpoint to use
server.use('/api/users', userRouter);

  server.get('/', (req, res) => {
    res.send(`<h2>Let's write some middleware!</h2>`);
  });


module.exports = server;
