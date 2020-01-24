'use strict';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;


var GAP = 50; // Шаг между столбцами
var GAP_SCORE = 10; // Отступ очков от столбца
var BAR_WIDTH = 40; // Ширина столбца
var BAR_HEIGHT = 150; // Высота столбца
var BAR_Y = 90; // Координата высоты столбца
var TEXT_Y = 260; // Координата высоты текста

// Ф-ция создания облака
var renderCloud = function (canvas, x, y, color) {
  canvas.fillStyle = color;
  canvas.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};
// Ф-ция нахождения максимального времени из массива
var getMaxTime = function (array) {
  var maxElement = array[0];
  for (var i = 0; i < array.length; i++) {
    if (array[i] > maxElement) {
      maxElement = array[i];
    }
  }
  return Math.round(maxElement);
};
// Ф-ция случайного числа
var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return (Math.floor(Math.random() * (max - min)) + min).toString();
};

window.renderStatistics = function (ctx, players, times) {
  // Тень от облака
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0,0,0,0.7)');
  // Основное облако
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');
  // Объявление победы
  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', 140, 35);
  ctx.fillText('Список результатов: ', 140, 55);

  // Отрисовка статистики
  for (var i = 0; i < players.length; i++) {
    var maxTime = getMaxTime(times);
    var saturation = getRandomInt(1, 101);
    // Ставим цвет тексту
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, TEXT_Y); // Пишем имя
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, BAR_Y + (BAR_HEIGHT - ((BAR_HEIGHT * Math.round(times[i])) / maxTime)) - GAP_SCORE); // Пишем очки
    // Выбираем цвет заливки в зависимости от игрока
    ctx.fillStyle = 'hsl(240 ,' + saturation + '%, 50%)';
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    // Рисуем столбцы
    ctx.fillRect(CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, BAR_Y + (BAR_HEIGHT - ((BAR_HEIGHT * Math.round(times[i])) / maxTime)), BAR_WIDTH, (BAR_HEIGHT * Math.round(times[i])) / maxTime);
  }
};
