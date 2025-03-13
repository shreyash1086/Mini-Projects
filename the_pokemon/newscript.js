
let sub = document.getElementById("subm");
sub.addEventListener("click", cards);

let no = document.getElementById("no")

let main = document.getElementById("main");
function pokeCard(data) {
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
  simg.appendChild(mini);
  let detail = document.createElement("div");
  detail.setAttribute("id", "detail");
  let name = document.createElement("h3");
  name.setAttribute("id", "name");
  detail.append(name);
  left.append(simg, detail);
  let right = document.createElement("div");
  right.setAttribute("id", "right");
  let hp = document.createElement("h2");
  hp.setAttribute("id", "hp");
  right.appendChild(hp);
  head.append(left, right);

  let body = document.createElement("div");
  body.setAttribute("id", "body");
  let type = document.createElement("div");
  type.setAttribute("id", "type");
  let img = document.createElement("div");
  img.setAttribute("id", "img");
  let bimg = document.createElement("img");
  bimg.setAttribute("id", "bimg");
  img.appendChild(bimg);
  let stats = document.createElement("div");
  stats.setAttribute("id", "stats");
  let height = document.createElement("h5");
  height.setAttribute("id", "height");
  let weight = document.createElement("h5");
  weight.setAttribute("id", "weight");
  stats.append(height, weight);
  body.append(type, img, stats);
  let hr = document.createElement("hr");
  card.append(head, hr, body);
  main.appendChild(card);
    name.innerHTML = data.name;
    mini.setAttribute("src", `${data.sprites.front_shiny}`);
    bimg.setAttribute("src", `${data.sprites.other.dream_world.front_default}`);
  hp.innerHTML = `<sub id ='sub'>hp</sub> ${data.stats["0"].base_stat}`;
  height.innerHTML = `Height : ${data.height}`
  weight.innerHTML = `Weight : ${data.weight}`;
  
}

export async function cards() {
  main.innerHTML = " ";
    let n = document.getElementById("num").value;

  for (let i = 0; i < n; i++) {
    let x = Math.floor(Math.random() * 898 + 1);
    await request(x);
  }
}

async function request(id) {
  let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  pokeCard(response.data);
}

