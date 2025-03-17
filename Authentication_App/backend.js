const express = require("express");
const app = express();
const { UserModel } = require("./db")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const users = []
const JWT_SECRET = "ILOVEMERN"

mongoose.connect(
    "mongodb+srv://shreyashdamodar1086:yrAqvo4WTSXkMPBY@cluster0.gwmn5.mongodb.net/AuthenticationApp"
)

app.use(express.json());
app.post("/signup", async (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    let errorthrown = false;
    try {
        const HashedPassword = await bcrypt.hash(password, 4);

        await UserModel.create({
            email: email,
            name: name,
            password: HashedPassword
        })
    } catch (e) {
        errorthrown = true;
        res.json({
            messege:"Email Already Exists"
        })
   }

    if (!errorthrown) {
        res.json({
            messege: "SucessFully Logged In"
        });
    }

});

app.post("/signin", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
        email: email
    })

    if (!user) {
        res.json({
            messege: "User not found"
        })
    }

    const passMatch = await bcrypt.compare(password, user.password)

    if (passMatch) {
        const token = jwt.sign({ id: user_id.toString() }, JWT_SECRET);
        res.json({
            token:token,
        });
    } else {
        res.status(403).json({
            messege: "Incorrect Credentials",
        });
    }
});

app.listen(3000);
