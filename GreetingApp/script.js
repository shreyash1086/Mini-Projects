function greeting() {
  let time = new Date()
  let hour = time.getHours()
  let greeting = "Good Evening"
  let bg = "rgb(29, 103, 77)";

  if (hour >= 6 && hour <= 12) {
    greeting = "Good Morning 🌅";
    bg = "rgb(29, 103, 77)";
  } else if (hour >= 12 && hour <= 17) {
    greeting = "Good Afternoon"
    bg = "rgb(136, 104, 41)";
  } else if (hour >= 17 && hour <= 21) {
    greeting = "Good Evening";
    bg = "rgb(40, 76, 106)";
  } else {
    greeting = "Good night";
    bg = "rgb(9, 19, 61)";
  }
  document.getElementById("heading2").innerHTML = greeting;
  document.querySelector("body").style.backgroundColor = bg;
}

setInterval(greeting,1000)


function time() {
  let time = new Date()
  let hour = time.getHours()
  let minute = time.getMinutes()
  let second = time.getSeconds()
  
  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;

  let currentTime = hour + ":" + minute + ":" + second;
   document.getElementById(
    "time"
  ).innerHTML = currentTime;
}

setInterval(time,1000);
