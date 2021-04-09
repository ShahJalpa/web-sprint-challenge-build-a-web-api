// Write your "projects" router here!
const express = require("express");
const Projects = require("./projects-model");
const {verifyProjectId} = require("../middleware/middleware");

const router = express.Router();

//get all projects
router.get("/", async(req, res, next) => {
    try{
        const projects = await Projects.get();
        res.json(projects)
    }catch(error){
        next(error)
    }
})

//get project by id
router.get("/:id", verifyProjectId, async(req, res, next) => {
    const project = req.projectId;
    res.json(project)
    next();
})
module.exports = router