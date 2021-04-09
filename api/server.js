// Complete your server here!
// Do NOT `server.listen()` inside this file!
const express =require('express');
const server = express();

const {logger} = require("./middleware/middleware.js");
const actionRouter = require("./actions/actions-router");

server.use(express.json());
server.use("/api/actions", logger, actionRouter);

server.get('/', (req, res) => {
    res.send(`<h2>Let's write some middleware!</h2>`);
  });

module.exports = server;
