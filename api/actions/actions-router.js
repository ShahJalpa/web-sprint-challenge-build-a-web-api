// Write your "actions" router here!
const express = require("express");
const Actions = require("./actions-model.js");
const {verifyActionId, verifyAction} = require("../middleware/middleware");

const router = express.Router();

//get all actions
router.get("/", async(req, res, next) => {
    try{
        const actions = await Actions.get();
        res.json(actions)
    }catch(error){
        next(error)
    }
})

//get action by id
router.get("/:id", verifyActionId, async(req, res, next) => {
    const action = req.actionId;
    res.json(action)
    next();
})

//post action
router.post("/", verifyAction, async (req, res, next)=>{
    try{
        const newData = req.body
        const newAction = await Actions.insert(newData)
        res.status(201).json(newAction)
    }catch(error){
        next(error)
    }
})

//put/update by id
router.put("/:id", verifyActionId, verifyAction, async(req, res, next) => {
    try{
        const {id} = req.params.id
        const updateAction = await Actions.update(id, req.body)
        if(updateAction){
            res.json(updateAction)
        }else{
            res.status(500).json({message:"update not possible"})
        }
    }catch(error){
        next(error)
    }
})


//delete action
router.delete("/:id", verifyActionId, async(req, res, next) => {
    try{
        const {id} = req.params.id
        const deleteAction = await Actions.remove(id)
        res.json(deleteAction)
    }catch(error){
        next(error)
    }
})

module.exports = router;