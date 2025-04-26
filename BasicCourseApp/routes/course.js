const { Router } = require("express")
const { courseModel } = require("../db")
const courseRouter = Router()

courseRouter.get("/purchase", async (req, res) => {
    
})

courseRouter.get("/preview", async (req, res) => {
    
})

module.exports = {
    courseRouter: courseRouter
}