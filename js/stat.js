'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHAPE_X = 110;
var SHAPE_Y = 20;

// Облако с тенью

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура! Вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);
};

// Отрисовка облака со статистикой

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, SHAPE_X, SHAPE_Y, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  // Поиск лучшего результата

  var maxValue = -1;

  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > maxValue) {
      maxValue = time;
    }
  }

  // Переменные для статистики

  var histogramHeight = 150;
  var step = histogramHeight / maxValue;
  var barHeight;
  var barWidth = 40;
  var barMargin = 90;
  var barX = 140;
  var barY = 90;


  for (i = 0; i < times.length; i++) {

    // Поиск высоты столбика

    barHeight = step * times[i];

    // Отрисовка текста результата

    ctx.fillStyle = '#000000';
    ctx.fillText(times[i].toFixed(0), barX, barY + histogramHeight - barHeight - 10);

    // Подбор цвета столбиков

    var rand = 20 - 0.5 + Math.random() * (100 - 20 + 1);

    rand = Math.round(rand);

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsla(240, 100%, ' + rand + '%, 1)';
    }

    // Отрисовка столбиков
    ctx.fillRect(barX, barY + histogramHeight - barHeight, barWidth, barHeight);

    // Отрисовка имён участников

    ctx.fillStyle = '#000000';
    ctx.fillText(names[i], barX, barY + histogramHeight + 20);
    barX = barX + barMargin;
  }
};

