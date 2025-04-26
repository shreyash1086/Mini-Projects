const express = require("express")
const app = express();
const { userRouter } = require("./routes/user")
const { adminRouter } = require("./routes/admin")
const { courseRouter } = require("./routes/course")

app.use(express.json())

app.use("/user", userRouter)
app.use("/admin", adminRouter)
app.use("/course", courseRouter)

app.listen(4000, () => {
    console.log("listening to port number 4000")
})
