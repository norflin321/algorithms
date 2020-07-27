const drawUI = async () => {
  document.getElementsByClassName("visual")[0].innerHTML = `<div class="stairs"></div><div class="buttons"></div>`;
  let arr = Array.from(new Array(50), i => i = Math.floor(Math.random() * (90 - 5) + 5));
  let stairs = document.getElementsByClassName("stairs")[0];

  for (i in arr) {
    let stair = document.createElement("div");
    stair.innerText = arr[i];
    stairs.appendChild(stair);
    let height = arr[i] * 5;
    stair.style = `height: ${height}px`;
    await new Promise(resolve => setTimeout(resolve, 5));
  }

  let buttonsWrap = document.getElementsByClassName("buttons")[0];
  let speeds = ["slow", "medium", "fast"];
  for (speed of speeds) {
    let button = document.createElement("button");
    button.innerText = speed;
    button.onclick = e => bubbleSort(e);
    buttonsWrap.appendChild(button);
  }
}

const bubbleSort = async e => {
  let buttons = document.getElementsByTagName("button");

  document.getElementsByClassName("buttons")[0].innerHTML = `<button style="width:100%" class="refresh">refresh</button>`;
  document.getElementsByClassName("refresh")[0].onclick = e => drawUI();

  let speed = e.target.innerText;
  const timeout = () => {
    let time = 5000;
    if (speed == "slow") {
      time = 300;
    } else if (speed == "medium") {
      time = 50;
    } else {
      time = 5;
    }
    return new Promise(resolve => setTimeout(resolve, time));
  }

  let stairs = document.getElementsByClassName("stairs")[0];
  let arr = stairs.children;
  for (let i = 0; i < arr.length; i++) {

    for (let j = arr.length-1; j > 0; j--) {
      let backgroundBefore = arr[j].style.backgroundColor; 
      arr[j].style.backgroundColor = "#e91e63";
      await timeout();
      arr[j-1].style.backgroundColor = "#2196f3";
      await timeout();
      if (arr[j].offsetHeight < arr[j-1].offsetHeight) {
        let copy = arr[j];
        stairs.insertBefore(arr[j], arr[j-1]);
        stairs.insertBefore(arr[j-1], copy);
      }
      await timeout();
      arr[j].style.backgroundColor = "white";
      arr[j-1].style.backgroundColor = "white";
      await timeout();
    }

  }
  console.log("done")
}

drawUI();
