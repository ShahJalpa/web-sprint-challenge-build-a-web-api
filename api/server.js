const { json } = require('express');
const express = require('express');
const server = express();

const actionRouter = require("./actions/actions-router");
const projectsRouter = require("./projects/projects-router")

server.use(express,json());

//server.use("/api/actions", actionRouter);
//server.use("api/projects", projectsRouter);

server.get("/", (req, res) => {
    res.json({message: "it is connecting"})
})

// Complete your server here!
// Do NOT `server.listen()` inside this file!

module.exports = server;
