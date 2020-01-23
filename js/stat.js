'use strict';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;


var GAP = 50; // Шаг между столбцами
var BAR_WIDTH = 40; // Ширина столбца
var BAR_HEIGHT = 150; // Высота столбца
var BAR_Y = 90;
var TEXT_Y = 260;

// Ф-ция создания облака
var renderCloud = function (canvas, x, y, color) {
  canvas.fillStyle = color;
  canvas.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

window.renderStatistics = function (ctx) {
  // Тень от облака
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0,0,0,0.7)');

  // Основное облако
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  // Объявление победы
  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили! \nСписок результатов: ', 140, 50);

  // Отрисовка статистики

  var players = ['Вы', 'Маша', 'Петя', 'Вася'];

  for (var i = 0; i < players.length; i++) {
    ctx.fillText(players[i], CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, TEXT_Y);
    ctx.fillRect(CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, BAR_Y, BAR_WIDTH, BAR_HEIGHT);
  }

  // ctx.fillText(playerName, CLOUD_X + GAP + (BAR_WIDTH + GAP) * playerIndex, TEXT_Y);
  // ctx.fillRect(CLOUD_X + GAP + (BAR_WIDTH + GAP) * playerIndex, BAR_Y, BAR_WIDTH, BAR_HEIGHT);
  //
  // playerIndex = 1;
  // playerName = 'Маша';
  //
  // ctx.fillText(playerName, CLOUD_X + GAP + (BAR_WIDTH + GAP) * playerIndex, TEXT_Y);
  // ctx.fillRect(CLOUD_X + GAP + (BAR_WIDTH + GAP) * playerIndex, BAR_Y, BAR_WIDTH, BAR_HEIGHT);
  //
  // playerIndex = 2;
  // playerName = 'Петя';
  //
  // ctx.fillText(playerName, CLOUD_X + GAP + (BAR_WIDTH + GAP) * playerIndex, TEXT_Y);
  // ctx.fillRect(CLOUD_X + GAP + (BAR_WIDTH + GAP) * playerIndex, BAR_Y, BAR_WIDTH, BAR_HEIGHT);
  //
  // playerIndex = 3;
  // playerName = 'Вася';
  //
  // ctx.fillText(playerName, CLOUD_X + GAP + (BAR_WIDTH + GAP) * playerIndex, TEXT_Y);
  // ctx.fillRect(CLOUD_X + GAP + (BAR_WIDTH + GAP) * playerIndex, BAR_Y, BAR_WIDTH, BAR_HEIGHT);
};
