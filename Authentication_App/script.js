let button1 = document.getElementById("signU")
button1.addEventListener("click",signup)

async function signup() {
    let email = document.getElementById("email").value;
    let name = document.getElementById("name").value;
    let password = document.getElementById("password").value;

    try {
        await axios.post("http://localhost:3000/signup", {
            email: email,
            name: name,
            password: password
        })
        alert("Successfully signed up")
        
    } catch (err) {
        alert(err) 
        console.log(err)
    }
}

async function signin() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    try {
        const response = await axios.post("http://localhost:3000/signin", {
            email: email,
            password: password
        })
        res.json({

        })
    } catch (err) {
        res.json({
            ERROR:err.message
        })
    }
}