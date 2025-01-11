const listSize = document.getElementById("list_size");
const sortSpeed = document.getElementById("list_speed");
const randomList = document.getElementsByClassName("random_list")[0];
const visualizeButton = document.getElementsByClassName("visualize")[0];
const listContainer = document.getElementsByClassName("list")[0];
const choosenAlgo = document.getElementById("alogrithm");

let list = [];
let isSortingCancelled = false;

function editListSize() {
  let containerWidth = listContainer.offsetWidth - 30;
  listSize.max = parseInt(containerWidth / 32);
}

function getRandomNumber() {
  return Math.floor(Math.random() * 50) + 1;
}

function getRandomList() {
  for (let i = 0; i < listSize.value; i++) {
    list.push(getRandomNumber());
    let height = list[i] * 10;
    const element = document.createElement("div");
    const number = document.createElement("p");
    number.textContent = `${list[i]}`;
    element.classList.add("element");
    number.classList.add("number");
    element.style.height = `${height}px`;
    element.appendChild(number);
    listContainer.appendChild(element);
  }
}

function reset() {
  list = [];
  listContainer.innerHTML = ``;
}

function resetButtonStatus() {
  visualizeButton.disabled = false;
  visualizeButton.style.backgroundColor = "#28A745";
  visualizeButton.style.cursor = "pointer";
  visualizeButton.style.opacity = "1";
}

function disableButton() {
  visualizeButton.disabled = true;
  visualizeButton.style.backgroundColor = "#E74C3C";
  visualizeButton.style.cursor = "not-allowed";
  visualizeButton.style.opacity = "0.6";
}

function sorted(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) return false;
  }
  return true;
}

window.addEventListener("resize", function () {
  reset();
  resetButtonStatus();
  editListSize();
  getRandomList();
  isSortingCancelled = true;
});

randomList.addEventListener("click", function () {
  reset();
  resetButtonStatus();
  editListSize();
  getRandomList();
  isSortingCancelled = true;
});

listSize.addEventListener("input", function () {
  reset();
  resetButtonStatus();
  editListSize();
  getRandomList();
  isSortingCancelled = true;
});

visualizeButton.addEventListener("click", function () {
  const validAlgorithms = [
    "Bubble sort",
    "Selection sort",
    "Insertion sort",
    "Merge sort",
    "Quick sort",
  ];
  if (!validAlgorithms.includes(choosenAlgo.value)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please, select the algorithm that you want to visualize.",
    });
  } else {
    disableButton();
    if (choosenAlgo.value == "Bubble sort") bubbleSort();
    if (choosenAlgo.value == "Selection sort") selectionSort();
    if (choosenAlgo.value == "Insertion sort") insertionSort();
    if (choosenAlgo.value == "Merge sort") mergeSort(list, 0, list.length - 1);
    if (choosenAlgo.value == "Quick sort") quickSort(list);
  }
});

function pause(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubbleSort() {
  const element = document.getElementsByClassName("element");
  const number = document.getElementsByClassName("number");
  isSortingCancelled = false;

  for (let i = 0, k = list.length - 1; i < list.length; i++, k--) {
    for (let j = 0; j < list.length - i - 1; j++) {
      if (isSortingCancelled) {
        isSortingCancelled = false;
        return;
      }

      element[j].style.transition = `all ${1001 - sortSpeed.value}ms`;
      element[j + 1].style.transition = `all ${1001 - sortSpeed.value}ms`;
      element[j].style.backgroundColor = "#F1C40F";
      element[j + 1].style.backgroundColor = "#F1C40F";

      await pause(1001 - sortSpeed.value);
      if (list[j] > list[j + 1]) {
        [list[j], list[j + 1]] = [list[j + 1], list[j]];

        element[j].style.height = list[j] * 10 + "px";
        number[j].textContent = `${list[j]}`;

        element[j + 1].style.height = list[j + 1] * 10 + "px";
        number[j + 1].textContent = `${list[j + 1]}`;
      }
      element[j].style.backgroundColor = "#E74C3C";
      element[j + 1].style.backgroundColor = "#E74C3C";
    }
    element[k].style.backgroundColor = "#28A745";
  }
}

async function selectionSort() {
  const element = document.getElementsByClassName("element");
  const number = document.getElementsByClassName("number");
  isSortingCancelled = false;

  for (let i = 0; i < list.length; i++) {
    let mn = list[i],
      idx = i;

    element[i].style.transition = `all ${1001 - sortSpeed.value}ms`;
    element[i].style.backgroundColor = "#F1C40F";

    await pause(1001 - sortSpeed.value);
    for (let j = i + 1; j < list.length; j++) {
      if (isSortingCancelled) {
        isSortingCancelled = false;
        return;
      }

      element[j].style.transition = `all ${1001 - sortSpeed.value}ms`;
      element[j].style.backgroundColor = "#F1C40F";
      await pause(1001 - sortSpeed.value);

      if (mn > list[j]) {
        mn = list[j];
        idx = j;
      }

      element[j].style.backgroundColor = "#E74C3C";
    }

    [list[i], list[idx]] = [list[idx], list[i]];

    element[i].style.height = list[i] * 10 + "px";
    number[i].textContent = `${list[i]}`;

    element[idx].style.height = list[idx] * 10 + "px";
    number[idx].textContent = `${list[idx]}`;
    element[i].style.backgroundColor = "#28A745";
  }
}

async function insertionSort() {
  const element = document.getElementsByClassName("element");
  const number = document.getElementsByClassName("number");
  isSortingCancelled = false;

  for (let i = 1; i < list.length; i++) {
    let current = list[i];
    let j = i - 1;

    while (j >= 0 && list[j] > current) {
      if (isSortingCancelled) {
        isSortingCancelled = false;
        return;
      }

      element[j].style.transition = `all ${1001 - sortSpeed.value}ms`;
      element[j].style.backgroundColor = "#F1C40F";
      element[j + 1].style.transition = `all ${1001 - sortSpeed.value}ms`;
      element[j + 1].style.backgroundColor = "#F1C40F";

      list[j + 1] = list[j];
      element[j + 1].style.height = list[j] * 10 + "px";
      number[j + 1].textContent = `${list[j]}`;
      await pause(1001 - sortSpeed.value);
      element[j + 1].style.backgroundColor = "#E74C3C";
      element[j].style.backgroundColor = "#E74C3C";
      j--;
    }

    list[j + 1] = current;
    element[j + 1].style.height = current * 10 + "px";
    number[j + 1].textContent = `${current}`;
    await pause(1001 - sortSpeed.value);
  }
  for (let i = 0; i < list.length; i++)
    element[i].style.backgroundColor = "#28A745";
}

async function mergeSort(arr, start, end) {
  if (start >= end) {
    return;
  }
  const mid = Math.floor((end + start) / 2);
  await mergeSort(arr, start, mid);
  await mergeSort(arr, mid + 1, end);
  await merge(arr, start, mid, end);
}

async function merge(arr, start, mid, end) {
  let left = [];
  let right = [];

  for (let i = 0; i < mid - start + 1; i++) left.push(arr[start + i]);
  for (let i = 0; i < end - mid; i++) right.push(arr[mid + 1 + i]);

  let i = 0,
    j = 0,
    k = start;

  const element = document.getElementsByClassName("element");
  const number = document.getElementsByClassName("number");

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      arr[k] = left[i];
      element[k].style.transition = `all ${1001 - sortSpeed.value}ms`;
      element[k].style.height = arr[k] * 10 + "px";
      element[k].style.backgroundColor = "#6ba368";
      number[k].textContent = `${arr[k]}`;
      i++;
    } else {
      arr[k] = right[j];
      element[k].style.transition = `all ${1001 - sortSpeed.value}ms`;
      element[k].style.height = arr[k] * 10 + "px";
      element[k].style.backgroundColor = "#6ba368";
      number[k].textContent = `${arr[k]}`;
      j++;
    }
    await pause(1001 - sortSpeed.value);
    k++;
  }

  while (i < left.length) {
    arr[k] = left[i];
    element[k].style.transition = `all ${1001 - sortSpeed.value}ms`;
    element[k].style.height = arr[k] * 10 + "px";
    element[k].style.backgroundColor = "#6ba368";
    number[k].textContent = `${arr[k]}`;
    await pause(1001 - sortSpeed.value);
    i++;
    k++;
  }

  while (j < right.length) {
    arr[k] = right[j];
    element[k].style.transition = `all ${1001 - sortSpeed.value}ms`;
    element[k].style.height = arr[k] * 10 + "px";
    element[k].style.backgroundColor = "#6ba368";
    number[k].textContent = `${arr[k]}`;
    await pause(1001 - sortSpeed.value);
    j++;
    k++;
  }
}

async function quickSort(arr, left = 0, right = list.length - 1) {
  if (left < right) {
    const pivotIndex = await partition(arr, left, right);
    await quickSort(arr, left, pivotIndex - 1);
    await quickSort(arr, pivotIndex + 1, right);
  }
  if (sorted(list)) {
    const element = document.getElementsByClassName("element");
    for (let i = 0; i < list.length; i++) {
      element[i].style.transition = `all ${1001 - sortSpeed.value}ms`;
      element[i].style.backgroundColor = "#28A745";
    }
  }
}

async function partition(arr, left, right) {
  const pivotValue = arr[right];
  let pivotIndex = left;

  const element = document.getElementsByClassName("element");
  const number = document.getElementsByClassName("number");

  element[right].style.backgroundColor = "gray";

  for (let i = left; i < right; i++) {
    if (arr[i] < pivotValue) {
      [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];

      element[i].style.transition = `all ${1001 - sortSpeed.value}ms`;
      element[pivotIndex].style.transition = `all ${1001 - sortSpeed.value}ms`;

      element[i].style.height = arr[i] * 10 + "px";
      element[pivotIndex].style.height = arr[pivotIndex] * 10 + "px";

      number[i].textContent = `${arr[i]}`;
      number[pivotIndex].textContent = `${arr[pivotIndex]}`;

      element[i].style.backgroundColor = "#F1C40F";
      element[pivotIndex].style.backgroundColor = "#F1C40F";

      pivotIndex++;
      await pause(1001 - sortSpeed.value);
      element[i].style.backgroundColor = "#E74C3C";
      element[pivotIndex - 1].style.backgroundColor = "#E74C3C";
    }
  }
  [arr[pivotIndex], arr[right]] = [arr[right], arr[pivotIndex]];

  element[pivotIndex].style.transition = `all ${1001 - sortSpeed.value}ms`;
  element[right].style.transition = `all ${1001 - sortSpeed.value}ms`;

  element[pivotIndex].style.height = arr[pivotIndex] * 10 + "px";
  number[pivotIndex].textContent = `${arr[pivotIndex]}`;

  element[right].style.height = arr[right] * 10 + "px";
  number[right].textContent = `${arr[right]}`;

  await pause(1001 - sortSpeed.value);
  element[right].style.backgroundColor = "#E74C3C";

  return pivotIndex;
}

editListSize();
getRandomList();
