const express = require("express")
require("dotenv").config()
const app = express();
const mongoose = require("mongoose")
const { userRouter } = require("./routes/user")
const { adminRouter } = require("./routes/admin")
const { courseRouter } = require("./routes/course")

app.use(express.json())

app.use("/user", userRouter)
app.use("/admin", adminRouter)
app.use("/course", courseRouter)

async function wait() {
    await mongoose.connect(process.env.MONGO_CONNECTION)
    app.listen(4000, () => {
        console.log("listening to port number 4000")
    })
}

wait()
