'use strict';
let Cards = document.getElementById('block');

let item = ['1', '2', '3', '4', '5', '6', '7', '8'];
let color = ['red', 'grey', 'yellow', 'blue', 'pink', 'green', 'orange', 'cyan'];
let resultsArr = [];
let counter = 0;
let btnStart = document.querySelector('#btnStart');

//переменные для таймера
var base = 60;
var clocktimer, dateObj, dh, dm, ds, ms;
var readout = '';
var h = 1,
  m = 1,
  tm = 1,
  s = 0,
  ts = 0,
  ms = 0,
  init = 0;



let cloneItem = item.slice(0); // дублируем массив
let cards = item.concat(cloneItem); // соединяем массивы

let cloneColor = color.slice(0);
let cardsColor = color.concat(cloneColor);

function randomItem(o) {
  for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
} //рандом карточек

randomItem(cards); //вызываем функцию рандома карточек
function drow() {
  for (let i = 0; i < cards.length; i++) {
    let card = document.createElement('div');
    card.dataset.item = cards[i];
    card.dataset.view = "card";
    Cards.appendChild(card);
  }
}
drow();

let card = document.querySelectorAll("[data-item]");

btnStart.onclick = function () {

  StartStop();
  if (btnStart.innerHTML == "Start") {
    btnStart.innerHTML = "stop";

  }
  // if (btnStart.innerHTML == "stop") {
  //   btnStart.innerHTML = "Start";
  //   for (let i = 0; i < card.length; i++) {
  //     card[i].removeAttribute('style');
  //     card[i].removeAttribute('data-color');
  //     card[i].removeAttribute('id');
  //   }
  // }

  for (let i = 0; i < card.length; i++) {
    for (let j = 0; j < cardsColor.length; j++) {
      if (card[i].dataset.item == j) {
        card[i].dataset.color = cardsColor[j];
      }
    }

    card[i].onclick = function (e) {

      e.target.style.background = e.target.dataset.color; //окрашиваем в цвет указанный в data-color;
      if (this.id != 'check' && this.id != 'correct') {
        this.id = 'check';
        let res = e.target.dataset.color;
        resultsArr.push(res);

      }

      if (resultsArr.length > 1) {
        if (resultsArr[0] === resultsArr[1]) {
          //функция проверки

          check('correct');
          counter++;
          win();

          resultsArr = [];

        } else {
          check('reverse');
          resultsArr = [];

        }
      }
    };
  }
};

/**/
//добавляем элементы на страницу с параметрами №элемента и его цвета


var check = function (id) {
  var x = document.querySelectorAll('#check');
  setTimeout(function () {
    for (let i = (x.length - 1); i >= 0; i--) {
      x[i].id = id;
      if (id == 'reverse') {
        x[i].style.background = null;
      }

    }
  }, 500);
};

var win = function () {
  if (counter === 8) {
    alert('Вы выиграли!\n' + 'Затраченное время: ' + document.MyForm.stopwatch.value);
    ClearСlock();
    btnStart.innerHTML = "Start";
    console.log(card);
    for (let i = 0; i < card.length; i++) {
      card[i].removeAttribute('style');
      card[i].removeAttribute('data-color');
      card[i].removeAttribute('id');
    }
  }
};


//функция для очистки поля
function ClearСlock() {
  clearTimeout(clocktimer);
  h = 1;
  m = 1;
  tm = 1;
  s = 0;
  ts = 0;
  ms = 0;
  init = 0;
  readout = '00:00:00';
  document.MyForm.stopwatch.value = readout;
}
//функция для старта секундомера
function StartTIME() {
  var cdateObj = new Date();
  var t = (cdateObj.getTime() - dateObj.getTime()) - (s * 1000);
  if (t > 999) {
    s++;
  }
  if (s >= (m * base)) {
    ts = 0;
    m++;
  } else {
    ts = parseInt((ms / 100) + s);
    if (ts >= base) {
      ts = ts - ((m - 1) * base);
    }
  }
  if (m > (h * base)) {
    tm = 1;
    h++;
  } else {
    tm = parseInt((ms / 100) + m);
    if (tm >= base) {
      tm = tm - ((h - 1) * base);
    }
  }
  ms = Math.round(t / 10);
  if (ms > 99) {
    ms = 0;
  }
  if (ms == 0) {
    ms = '00';
  }
  if (ms > 0 && ms <= 9) {
    ms = '0' + ms;
  }
  if (ts > 0) {
    ds = ts;
    if (ts < 10) {
      ds = '0' + ts;
    }
  } else {
    ds = '00';
  }
  dm = tm - 1;
  if (dm > 0) {
    if (dm < 10) {
      dm = '0' + dm;
    }
  } else {
    dm = '00';
  }
  dh = h - 1;
  if (dh > 0) {
    if (dh < 10) {
      dh = '0' + dh;
    }
  } else {
    dh = '00';
  }
  readout = dm + ':' + ds + '.' + ms;
  document.MyForm.stopwatch.value = readout;
  clocktimer = setTimeout("StartTIME()", 1);
}
//Функция запуска и остановки
function StartStop() {
  if (init == 0) {
    ClearСlock();
    dateObj = new Date();
    StartTIME();
    init = 1;
  } else {
    clearTimeout(clocktimer);
    init = 0;
  }
}