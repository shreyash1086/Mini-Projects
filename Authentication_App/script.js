let button1 = document.getElementById("signU")
button1.addEventListener("click",signup)

function signup() {
    let email = document.getElementById("email").value;
    let name = document.getElementById("name").value;
    let password = document.getElementById("password").value;

    axios.post("http://localhohst:3000/signup", {
        email: email,
        name: name,
        password,password
    })
}

function signin() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    const response = axios.post("http://localhohst:3000/signin", {
        email: email,
        password, password
    })
}

function getInfo() {
    axios.post()
}