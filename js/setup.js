'use strict';
var ESC_KEY = 27;
var ENTER_KEY = 13;
var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;

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

// Находим блок с фото пользователя для открытия окна статистики
var setupOpenButton = document.querySelector('.setup-open-icon');

// Находим кнопку для закрытия окна статистики
var setupCloseButton = setup.querySelector('.setup-close');

// Находим кнопку для закрытия окна статистики
var userNameField = setup.querySelector('.setup-user-name');

// Находим своего персонажа в окне статистики и нужные нам элементы (плащ, фаербол и т.д.)
var userWizard = setup.querySelector('.setup-wizard');
var userWizardEyes = userWizard.querySelector('.wizard-eyes');
var userWizardCoat = userWizard.querySelector('.wizard-coat');
var userWizardFireball = setup.querySelector('.setup-fireball-wrap');

// Находим нужные нам скрытые инпуты
var userWizardEyesInput = setup.querySelector('[name="eyes-color"]');
var userWizardCoatInput = setup.querySelector('[name="coat-color"]');
var userWizardFireballInput = setup.querySelector('[name="fireball-color"]');

// Создаем массив цветов для фаербола
var fireballColors = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848',
];

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
  'Ирвинг',
];

// Создаем массив цветов для мантии
var mantleColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)',
];

// Создаем массив цветов для глаз
var eyeColors = [
  'black',
  'red',
  'blue',
  'yellow',
  'green',
];

// Функция случайного числа в диапазоне
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция возврата случайного элемента из массива
var getRandomItem = function (array) {
  return array[getRandomNumber(0, array.length - 1)];
};

// Функция закрытия окна по нажатию ESC
var onEscCloseSetupHandler = function (evt) {
  if (evt.keyCode === ESC_KEY) {
    hideSetupWindowHandler();
  }
};

// Функция открытия окна статистики
var showSetupWindowHandler = function () {
  document.addEventListener('keydown', onEscCloseSetupHandler);
  setup.classList.remove('hidden');
  userNameField.addEventListener('input', userNameFieldValidityHandler);
};

// Функция закрытия окна статистики
var hideSetupWindowHandler = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onEscCloseSetupHandler);
};

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
      eyesColor: getRandomItem(eyeColors),
    };
    wizardsArr.push(wizard);
  }
  return wizardsArr;
};

// Функция для получения функции по переборке массива по кругу
var getNextNumberFromArray = function (array, index) {
  return function () {
    index++;
    if (index === array.length) {
      index = 0;
    }
    return array[index];
  };
};

// Присваеваем переменной вызов функции и передаем параметры для создания окружения на момент вызова
// Для цвета фаербола
var fireballColorCount = getNextNumberFromArray(fireballColors, -1);
// Для цвета глаз
var eyeColorCount = getNextNumberFromArray(eyeColors, -1);

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

// Функция валидности поля имени
var userNameFieldValidityHandler = function (evt) {
  var target = evt.target;
  if (target.value.length === 0) {
    target.setCustomValidity('Обязательное поле!');
  } else if (target.value.length < MIN_NAME_LENGTH) {
    target.setCustomValidity('Имя Вашего персонажа должно содержать не меньше ' + MIN_NAME_LENGTH + '-х символов!');
  } else if (target.value.length > MAX_NAME_LENGTH) {
    target.setCustomValidity('Имя Вашего персонажа не должно содержать более ' + MAX_NAME_LENGTH + '-ти символов!');
  } else {
    target.setCustomValidity('');
  }
  console.log(target.value);
};

// Вешаем обработчики
setupOpenButton.addEventListener('click', showSetupWindowHandler);
setupOpenButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY) {
    showSetupWindowHandler();
  }
});

setupCloseButton.addEventListener('click', hideSetupWindowHandler);
setupCloseButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY) {
    hideSetupWindowHandler();
  }
});

// Этим обработчиком запрещаем всплытие события ( закрытие по ESC ), если таргет = инпут
userNameField.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEY) {
    evt.stopPropagation();
  }
});

userWizardFireball.addEventListener('click', function () {
  userWizardFireball.style.background = fireballColorCount();
  userWizardFireballInput.value = userWizardFireball.style.background;
});

userWizardCoat.addEventListener('click', function () {
  userWizardCoat.style.fill = getRandomItem(mantleColors);
  userWizardCoatInput.value = userWizardCoat.style.fill;
});

userWizardEyes.addEventListener('click', function () {
  userWizardEyes.style.fill = eyeColorCount();
  userWizardEyesInput.value = userWizardEyes.style.fill;
});

// Вызываем функции
renderSimilarWizards(createWizards(SIMILAR_WIZARDS));
showSimilarWizardsBlock();
