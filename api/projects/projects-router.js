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

//put/update by id
router.put("/:id", verifyProjectId, verifyProject, async(req, res, next) => {
    try{
        //const {id} = req.params.id
        const updateProject = await Projects.update(req.params.id, req.body)
        if(updateProject){
            res.json(updateProject)
        }else{
            res.status(500).json({message:"update not possible"})
        }
    }catch(error){
        next(error)
    }
})

//delete project
router.delete("/:id", verifyProjectId, async(req, res, next) => {
    try{
        const deleteProject = await Projects.remove(req.param.id)
        res.json(deleteProject)
    }catch(error){
        next(error)
    }
})

//endpoint for retrieving the list of actions
router.get("/:id/actions", verifyProjectId, async(req, res, next) => {
    try{
        const projectActions = await Projects.getProjectActions(req.params.id)
        res.json(projectActions)
    }catch(error){
        next(error)
    }
})
module.exports = router