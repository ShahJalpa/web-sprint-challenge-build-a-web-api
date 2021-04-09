const Actions = require("../actions/actions-model");
const Projects = require("../projects/projects-model");

function logger(req, res, next){
    console.log(`Request Method: ${req.method} Request URL: ${req.url} TimeStamp: ${new Date()}`)
    next();
}

async function verifyActionId(req, res, next){
    try{
        const { id } = req.params
        const actionId = await Actions.get(id)
        if(!actionId){
            res.status(404).json({message:"action not found"})
        }else{
            req.actionId = actionId;
            next();
        }
    }catch(err){
        next(err);
    }
}

function verifyAction(req, res, next){
    if(!req.body.project_id || !req.body.description || !req.body.notes){
        res.status(400).json({message:"required misiing data"})
    }else{
        next();
    }
}

async function verifyProjectId(req, res, next){
    try{
        const { id } = req.params
        const projectId = await Projects.get(id)
        if(!projectId){
            res.status(404).json({message:"project not found"})
        }else{
            req.projectId = projectId;
            next();
        }
    }catch(err){
        next(err);
    }
}

function verifyProject(req, res, next){
    if(!req.body.name || !req.body.description){
        res.status(400).json({message: "misiing fields required"})
    }else{
        next()
    }
}
module.exports = {logger, verifyActionId, verifyAction, verifyProjectId, verifyProject}