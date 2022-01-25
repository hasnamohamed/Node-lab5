const express = require("express");
const { Plan } = require("../models/plan");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const app = express();

const router = express.Router()


router.get("/",auth,async (req, res) => {
    const plans = await Plan.find()
        .populate("users", "name email -_id")
    res.json(plans)
})

router.get("/:id",auth ,async (req, res) => {
    const plan = await Plan.findById(req.params.id);
    res.json(plan)
})
router.post("/",[auth, admin],async (req, res) => {
    if(req.user.isAdmin){
    const newPlan = new Plan(req.body)
    const result = await newPlan.save()
    res.json(result)
    }
    res.status(401).json("You Are Not An Admin Go Away")
});

router.put("/:id",[auth,admin], async (req, res) => {
    if(req.user.isAdmin){
    const plan = await Plan.findById(req.params.id);
    plan.name = req.body.name
    plan.price = req.body.price
    await plan.save();
    res.json(plan)
    }
    res.status(401).json("You Are Not An Admin Go Away")
})

router.delete("/:id",[auth, admin], async (req, res) => {
    if(req.user.isAdmin){
    const result = await Plan.findByIdAndDelete(req.params.id);
    res.json(result)
    }
    res.status(401).json("You Are Not An Admin Go Away")
})

module.exports = router