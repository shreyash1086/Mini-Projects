const { Router } = require("express")
const { adminModel } = require("../db")
const adminRouter = Router();

adminRouter.post("/signup", async (req, res) => {
    
})

adminRouter.post("/signin", async (req, res) => {

})

adminRouter.post("/course", async (req, res) => {
    //to upload a new course
})

adminRouter.put("/course", async (req, res) => {
    //to update the current course
})

module.exports = {
    adminRouter:adminRouter
}