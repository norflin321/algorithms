const drawUI = async () => {
  document.getElementsByClassName("visual")[0].innerHTML = `<div class="stairs"></div><div class="buttons-wrap"></div>`;
  let arr = Array.from(new Array(50), i => i = Math.floor(Math.random() * (90 - 5) + 5));
  let stairs = document.getElementsByClassName("stairs")[0];

  // draw stairs
  for (i in arr) {
    let stair = document.createElement("div");
    stair.innerText = arr[i];
    stairs.appendChild(stair);
    let height = arr[i] * 4;
    stair.style = `height: ${height}px`;
  }

  // draw buttons
  let buttonsWrap = document.getElementsByClassName("buttons-wrap")[0];
  let sorts = ["bubble sort", "insert sort", "merge sort"];
  for (sort of sorts) {
    let buttonWrap = document.createElement("div");
    let button = document.createElement("button");
    button.style.width = "180px";
    button.innerText = sort;
    button.onclick = e => chooseSpeed(e);
    buttonWrap.appendChild(button);
    buttonsWrap.appendChild(buttonWrap);
  }
}

// draw speed buttons, after sorting algo choosed
const chooseSpeed = e => {
  let sortName = e.target.innerText;
  for (btn of e.target.parentNode.parentNode.children) {
    if (btn != e.target.parentNode) {
      btn.children[0].style.display = "none";
    }
  }
  e.target.style.display = "none";
  for (speed of ["slow", "medium", "fast"]) {
    let button = document.createElement("button");
    button.innerText = speed;
    button.style.width = "65px";
    button.onclick = e => runSort(e, sortName);
    e.target.parentNode.appendChild(button);
  }
}

const runSort = async (e, sortName) => {
  // draw refresh button
  e.target.parentNode.innerHTML = `<button style="width:100%" class="refresh">refresh</button>`;
  document.getElementsByClassName("refresh")[0].onclick = e => drawUI();

  let speed = e.target.innerText;
  const timeout = () => {
    let time = 0;
    if (speed == "slow") {
      time = 1000;
    } else if (speed == "medium") {
      time = 50;
    } else {
      time = 5;
    }
    return new Promise(resolve => setTimeout(resolve, time));
  }

  let stairs = document.getElementsByClassName("stairs")[0];
  let arr = stairs.children;

  // run sorts
  if (sortName == "bubble sort") {
    await bubbleSort(stairs, arr, timeout);
  } else if (sortName == "insert sort") {
    await insertSort(stairs, arr, timeout);
  } else if (sortName == "merge sort") {
    let arrNew = [];
    for (i of arr) arrNew.push(i);
    arr = arrNew;
    console.log(await mergeSort(stairs, arr, timeout))
  }
}

// different sorts functions
const insertSort = async (stairs, arr, timeout) => {
  let key;
  for (let i = 1; i < arr.length; i++) {
    key = arr[i];
    key.style.backgroundColor = "#e91e63";
    let j = i - 1;
    await timeout();
    while(j >= 0) {
      arr[j].style.backgroundColor = "#2196f3";
      await timeout();
      if (arr[j].offsetHeight > key.offsetHeight) {
        arr[j].style.backgroundColor = "white";
        stairs.insertBefore(arr[j+1], arr[j])
        j--;
      } else {
        arr[j].style.backgroundColor = "white"
        break;
      }
    }
    key.style.backgroundColor = "white";
    stairs.insertBefore(arr[j+1], key);
    await timeout();
  }
}

const bubbleSort = async (stairs, arr, timeout) => {
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
}

const mergeSort = (stairs, arr, timeout) => {

  if (arr.length == 1) {
    return arr;
  } else if (arr.length == 2) {
    if (arr[0].offsetHeight > arr[1].offsetHeight) {
      return [arr[1], arr[0]];
    } else {
      return arr;
    }
  }

  let mid = parseInt(arr.length/2);
  let p1 = mergeSort(stairs, arr.slice(0, mid), timeout);
  let p2 = mergeSort(stairs, arr.slice(mid), timeout);

  let merged = [];

  while(1) {

    if (p1.length > 0 && p2.length > 0) {
      console.log(p1[0], p2[0]);
      if (p1[0].offsetHeight <= p2[0].offsetHeight) {
        merged.push(p1[0]);
        p1 = p1.slice(1);
      } else {
        merged.push(p2[0]);
        p2 = p2.slice(1);
      }
    } else if (p1.length > 0) {
      merged = merged.concat(p1);
      p1 = [];
    } else if (p2.length > 0) {
      merged = merged.concat(p2);
      p2 = [];
    } else {
      break;
    }

  }
  return merged;
}
drawUI();
