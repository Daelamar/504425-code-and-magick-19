'use strict';
// Колличество похожих магов
var SIMILAR_WIZARDS = 4;

// Находим окно статистики
var setup = document.querySelector('.setup');

// Находим окно с похожими магами
var setupWizards = document.querySelector('.setup-similar');

// Находим список похожих магов
var wizardListElement = document.querySelector('.setup-similar-list');

// Находим шаблон для копирования магов
var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

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
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция возврата случайного элемента из массива
var getRandomItem = function (array) {
  return array[getRandomNumber(0, array.length - 1)];
};

// Функция открытия окна статистики
var showSetupWindow = function () {
  setup.classList.remove('hidden');
};

// Функция закрытия окна статистики
// var hideSetupWindow = function () {
//   setup.classList.add('hidden');
// };

// Функция открытия окна похожих магов
var showSimilarWizardsBlock = function () {
  setupWizards.classList.remove('hidden');
};

// Функция закрытия окна похожих магов
// var hideSimilarWizardsBlock = function () {
//   setupWizards.classList.add('hidden');
// };

// Функция создания похожих магов и добавления их в массив
var createWizards = function (number) {
  var wizardsArr = [];
  for (var i = 1; i <= number; i++) {
    var wizard = {
      name: getRandomItem(names) + ' ' + getRandomItem(secondNames),
      coatColor: getRandomItem(mantleColors),
      eyesColor: getRandomItem(eyeColors)
    };
    wizardsArr.push(wizard);
  }
  return wizardsArr;
};

// Функция заполнения html-элементов похожего мага ( цвет,имя и т.д )
var createWizardElement = function (wizard) {
  var wizardElement = wizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// Функция рендоринга магов на странице
var renderSimilarWizards = function (wizardObjects) {
  var fragment = document.createDocumentFragment();
  for (var t = 0; t < wizardObjects.length; t++) {
    fragment.appendChild(createWizardElement(wizardObjects[t]));
  }
  wizardListElement.appendChild(fragment);
};

// Вызываем функции
showSetupWindow();
renderSimilarWizards(createWizards(SIMILAR_WIZARDS));
showSimilarWizardsBlock();
