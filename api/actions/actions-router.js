// Write your "actions" router here!
const express = require("express");
const Actions = require("./actions-model.js");
const {verifyActionId} = require("../middleware/middleware");

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

module.exports = router;