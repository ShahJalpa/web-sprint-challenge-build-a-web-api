// Write your "projects" router here!
const express = require("express");
const Projects = require("./projects-model");
const {verifyProjectId, verifyProject} = require("../middleware/middleware");

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

//post project
router.post("/", verifyProject, async (req, res, next)=>{
    try{
        const newData = req.body
        const newProject= await Projects.insert(newData)
        res.status(201).json(newProject)
    }catch(error){
        next(error)
    }
})

//delete project
router.delete("/:id", verifyProjectId, async(req, res, next) => {
    try{
        //const {id} = req.params.id
        const deleteProject = await Projects.remove(req.param.id)
        res.json(deleteProject)
    }catch(error){
        next(error)
    }
})
module.exports = router