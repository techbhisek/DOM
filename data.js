let arr = JSON.parse(localStorage.getItem('tasks')) || [];
let data = JSON.parse(localStorage.getItem('dates')) || [];
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

  li.appendChild(textnode);
  li.appendChild(check);
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

    li.appendChild(textnode);
    li.appendChild(check);
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
        `${data[index].percentage}`
      );
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
