// Bubble Sort
const bubbleSort = arr => {
  for (_ in arr) {
    for (let i = arr.length-1; i > 0; i--) {
      if (arr[i] < arr[i-1]) {
        let x = arr[i];
        arr[i] = arr[i-1];
        arr[i-1] = x;
      }
    }
  }
  return arr;
}

// Insertion Sort
const insertSort = arr => {
  let key;
  for (let i = 1; i < arr.length; i++) {
    key = arr[i];
    let j = i - 1;
    while(j >= 0 && arr[j] > key) {
      arr[j+1] = arr[j];
      j--;
    }
    arr[j+1] = key;
  }
  return arr;
}

// Merge Sort
const mergeSort = arr => {
  const qonquer = (p1, p2) => {
    let sorted = [];
    let i = 0;
    let j = 0;
    while (i < p1.length && j < p2.length) {
      if (p1[i] < p2[j]) {
        sorted.push(p1[i]);
        i++;
      } else {
        sorted.push(p2[j]);
        j++;
      }
    }
    return [...sorted, ...p1.slice(i), ...p2.slice(j)];
  }
  const divide = arr => {
    if (arr.length <= 1) {
      return arr;
    }
    let mid = Math.floor(arr.length/2);
    return qonquer(divide(arr.slice(0, mid)), divide(arr.slice(mid)));
  }
  return divide(arr);
}

// Tests
const randomArr = () => Array.from(new Array(10000), i => i = Math.floor(Math.random() * 10000));

console.time("insert");
console.log(insertSort(randomArr()));
console.timeEnd("insert");

console.time("bubble")
console.log(bubbleSort(randomArr()));
console.timeEnd("bubble");

console.time("merge")
console.log(mergeSort(randomArr()));
console.timeEnd("merge")
