'use strict';

var SIMILAR_WIZARDS = 4;

// Находим окно персонажа и показываем его
var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

// Находим окно похожих магов
var wizardListElement = document.querySelector('.setup-similar-list');

// Находим шаблон для копирования магов
var wizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

// Создаем фрагмент
var fragment = document.createDocumentFragment();

// Создаем пустой массив, куда будем скидывать похожих магов
var wizardsArr = [];

// Создаем массив имен
var names = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

// Создаем массив фамилий
var secondNames = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

// Создаем массив цветов для мантии
var mantleColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

// Создаем массив цветов для глаз
var eyeColors = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

// Функция случайного числа в диапазоне
var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Создаем 4х похожих магов и пушим их в массив

var getWizardsArr = function (number) {
  for (var i = 1; i <= number; i++) {
    var wizard = {
      name: names[getRandom(0, names.length - 1)] + ' ' + secondNames[getRandom(0, secondNames.length - 1)],
      coatColor: mantleColors[getRandom(0, mantleColors.length - 1)],
      eyesColor: eyeColors[getRandom(0, eyeColors.length - 1)]
    };
    wizardsArr.push(wizard);
  }
  return wizardsArr;
};

// Функция создания мага ( рендеринг имени,цветов )
var renderWizard = function (wizards) {
  var wizardElement = wizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizards.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizards.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizards.eyesColor;

  return wizardElement;
};

// Отрисуем магов на странице
var getWizardsList = function (array) {
  for (var t = 0; t < array.length; t++) {
    wizardListElement.appendChild(renderWizard(array[t]));
  }
};

getWizardsArr(SIMILAR_WIZARDS);
getWizardsList(wizardsArr);

// Показываем окно с похожими магами
var setupWizards = document.querySelector('.setup-similar');
setupWizards.classList.remove('hidden');
