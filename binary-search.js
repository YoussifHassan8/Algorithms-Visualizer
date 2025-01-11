const listSize = document.getElementById("list_size");
const sortSpeed = document.getElementById("list_speed");
const randomList = document.getElementsByClassName("random_list")[0];
const visualizeButton = document.getElementsByClassName("visualize")[0];
const listContainer = document.getElementsByClassName("list")[0];
const statusContainer = document.getElementsByClassName("status-container")[0];
let list = [];
let isSortingCancelled = false;

function editListSize() {
  let containerWidth = listContainer.offsetWidth - 30;
  listSize.max = parseInt(containerWidth / 59);
}

function getRandomNumber() {
  return Math.floor(Math.random() * 50) + 1;
}

function getRandomList() {
  for (let i = 0; i < listSize.value; i++) {
    list.push(getRandomNumber());
  }
  list.sort((a, b) => a - b);
  for (let i = 0; i < list.length; i++) {
    let height = 100;
    const element = document.createElement("div");
    const row = document.createElement("div");
    const number = document.createElement("p");
    const elementStatus = document.createElement("p");
    number.textContent = `${list[i]}`;
    element.classList.add("element");
    number.classList.add("number");
    row.classList.add("row");
    elementStatus.classList.add("elementStatus");
    element.style.height = `${height}px`;
    element.style.backgroundColor = "#28A745";
    element.appendChild(number);
    elementStatus.style.marginTop = "4px";
    row.appendChild(element);
    row.appendChild(elementStatus);
    listContainer.appendChild(row);
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
  disableButton();
  binarySearch();
});

window.addEventListener("resize", function () {
  reset();
  resetButtonStatus();
  editListSize();
  getRandomList();
  isSortingCancelled = true;
});

function pause(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function binarySearch() {
  const element = document.getElementsByClassName("element");
  const elementStatus = document.getElementsByClassName("elementStatus");
  const numberSearchingFor = document.getElementsByClassName("search")[0];
  isSortingCancelled = false;

  for (let i = 0; i < list.length; i++)
    element[i].style.backgroundColor = "#28A745";

  let l = 0,
    r = list.length - 1,
    mid;

  while (l <= r) {
    mid = Math.floor((l + r) / 2);

    element[l].style.transition = `all ${1001 - sortSpeed.value}ms`;
    element[r].style.transition = `all ${1001 - sortSpeed.value}ms`;
    element[mid].style.transition = `all ${1001 - sortSpeed.value}ms`;

    elementStatus[l].textContent = "Left";
    elementStatus[r].textContent = "Right";
    elementStatus[mid].textContent = "Mid";

    if (l == r && r == mid) elementStatus[l].textContent = "Left/Mid/Right";
    else if (l == mid) elementStatus[l].textContent = "Left/Mid";
    else if (r == mid) elementStatus[r].textContent = "Right/Mid";

    element[l].style.backgroundColor = "#F1C40F";
    element[r].style.backgroundColor = "#F1C40F";
    element[mid].style.backgroundColor = "red";

    await pause(1001 - sortSpeed.value);

    element[l].style.backgroundColor = "#28A745";
    element[r].style.backgroundColor = "#28A745";
    element[mid].style.backgroundColor = "#28A745";

    elementStatus[l].textContent = "";
    elementStatus[r].textContent = "";
    elementStatus[mid].textContent = "";

    if (list[mid] > numberSearchingFor.value) r = mid - 1;
    if (list[mid] < numberSearchingFor.value) l = mid + 1;
    if (list[mid] == numberSearchingFor.value) {
      element[mid].style.backgroundColor = "red";
      elementStatus[mid].textContent = "Found";
      return;
    }
  }
  resetButtonStatus();
  isSortingCancelled = false;
}

editListSize();
getRandomList();
