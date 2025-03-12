let main = document.getElementById("main")
function pokeCard() {
    let card = document.createElement("div");
    card.setAttribute("id", "card");
    let head = document.createElement("div");
    head.setAttribute("id", "head");
    let left = document.createElement("div");
    left.setAttribute("id", "left");
    let simg = document.createElement("div");
    simg.setAttribute("id", "simg");
    let mini = document.createElement("img");
    mini.setAttribute("id", "mini");
    simg.appendChild(mini)
    let detail = document.createElement("div");
    detail.setAttribute("id", "detail");
    let pastform = document.createElement("h5");
    pastform.setAttribute("id", "pastform");
    let name = document.createElement("h3");
    name.setAttribute("id", "name");
    detail.append(pastform, name)
    left.append(simg, detail)
    let right = document.createElement("div");
    right.setAttribute("id", "right");
    let hp = document.createElement("h2");
    hp.setAttribute("id", "hp");
    right.appendChild(hp)
    head.append(left, right);
    
    let body = document.createElement("div");
    body.setAttribute("id", "body");
    let type = document.createElement("div");
    type.setAttribute("id", "type");
    let img = document.createElement("div");
    img.setAttribute("id", "img");
    let bimg = document.createElement("img");
    bimg.setAttribute("id", "bimg");
    img.appendChild(bimg)
    let stats = document.createElement("div");
    stats.setAttribute("id", "stats");
    let height = document.createElement("h5");
    height.setAttribute("id", "height");
    let weight = document.createElement("h5");
    weight.setAttribute("id", "weight");
    stats.append(height, weight)
    body.append(type, img, stats)
    let hr = document.createElement("hr")
    card.append(head, hr, body)
    main.appendChild(card);

    // pastform.innerHTML = "Evolved from Pichu"
    // name.innerHTML = "Pikachu"
    // hp.textContent = "1000"
    // hp.innerHTML = "<sub id ='sub'>hp</sub> 1000";
    // height.innerHTML = "Height"
    // weight.innerHTML = "Weight"
}

export function cards() {
    main.innerHTML = " ";
    let n = document.getElementById("num").value;
    for (let i = 0; i < n; i++) {
        let n = generateRandom();
        request(n)
        pokeCard();
    }
}
let sub = document.getElementById("sub");
sub.addEventListener("click", cards);

function generateRandom() {
    // generate random number between 0 to 100;
    return n;
}

function request(n) {
    let response = axios.get("");
    
}