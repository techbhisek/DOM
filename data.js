let arr = JSON.parse(localStorage.getItem('tasks')) || [];
let data = JSON.parse(localStorage.getItem('dates')) || [];
let checkmark = JSON.parse(localStorage.getItem('checks')) || [];
function checkfun() {
  localStorage.setItem('check', JSON.stringify(checkmark));
}
function updateLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(arr));
}

function DailyProgress() {
  localStorage.setItem('dates', JSON.stringify(data));
}

function add() {
  let ul = document.getElementById('ul');
  let input = document.getElementById('done');
  let li = document.createElement('li');
  li.className = 'list';
  let textnode = document.createTextNode(`${input.value}`);
  let check = document.createElement('input');
  check.className = 'check';
  check.type = 'checkbox';
  let button = document.createElement('button');
  button.innerHTML = '-';
  button.className = 'del';
  let div = document.createElement('div');

  li.appendChild(textnode);
  div.appendChild(check);
  div.appendChild(button);
  li.appendChild(div);
  ul.appendChild(li);

  arr.push(input.value);
  updateLocalStorage();

  input.value = '';
}

function render() {
  arr.forEach((element) => {
    let ul = document.getElementById('ul');
    let li = document.createElement('li');
    li.className = 'list';
    let textnode = document.createTextNode(`${element}`);
    let check = document.createElement('input');
    check.className = 'check';
    check.type = 'checkbox';
    let button = document.createElement('button');
    button.innerHTML = '-';
    button.className = 'del';
    let div = document.createElement('div');

    li.appendChild(textnode);
    div.appendChild(check);
    div.appendChild(button);
    li.appendChild(div);
    ul.appendChild(li);
  });
}
render();

function show() {
  document.getElementsByClassName('after')[0].style.display = 'flex';

  let progress = 0;
  let checkbox = document.getElementsByClassName('check');

  for (let index = 0; index < checkbox.length; index++) {
    if (checkbox[index].checked) {
      progress++;
    }
  }
  let percentage = (progress / checkbox.length) * 100;
  document.getElementById('percent').innerText = percentage;
  document.getElementById('file').value = percentage;
  arr = [];
  updateLocalStorage();
  document.getElementById('ul').innerHTML = '';
  document.getElementsByClassName('main')[0].style.display = 'none';
  let reset = document.getElementById('reset');
  reset.innerText = 'new';

  const date = new Date();
  let local = date.toLocaleDateString();

  let a = {
    date: local,
    percentage,
  };
  data.push(a);
  DailyProgress();
  console.log(data);
}
let resetblock = 0;
function reset() {
  if (resetblock == 0) {
    arr = [];

    updateLocalStorage();
    document.getElementById('ul').innerHTML = '';
    resetblock = 1;
  } else {
    document.getElementsByClassName('main')[0].style.display = 'flex';
    document.getElementsByClassName('after')[0].style.display =
      'none';
    document.getElementById('reset');
    reset.innerText = 'reset';

    resetblock = 0;
  }
}

let flag = 0;

function daily() {
  if (flag == 0) {
    document.getElementsByClassName('daily')[0].style.display =
      'block';
    let history = document.getElementsByClassName('history')[0];

    for (let index = 0; index < data.length; index++) {
      let date = document.createElement('div');
      date.className = 'date';
      let textnode = document.createTextNode(`${data[index].date}`);
      date.appendChild(textnode);
      let progress = document.createElement('div');
      progress.className = 'progress';
      let textnode1 = document.createTextNode(
        `${parseInt(parseInt(data[index].percentage))}`
      );
      if (data[index].percentage < 50) {
        date.style.color = 'red';
        progress.style.color = 'red';
      }
      progress.appendChild(textnode1);

      history.appendChild(date);
      history.appendChild(progress);
    }
    flag = 1;
  } else {
    document.getElementsByClassName('daily')[0].style.display =
      'none';
    document.getElementsByClassName('history')[0].innerHTML = '';
    flag = 0;
  }
}

document.getElementById('ul').addEventListener('click', (event) => {
  if (event.target.className == 'del') {
    event.target.parentElement.parentElement.remove();
    let target = event.target.parentElement.parentElement.innerText;
    let bb = arr.filter((str) => {
      if (str + '-' != target) {
        return true;
      }
      return false;
    });
    arr = bb;
    updateLocalStorage();
  }
});
