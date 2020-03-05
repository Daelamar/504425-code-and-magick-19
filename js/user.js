'use strict';

(function () {
  var MIN_NAME_LENGTH = 2;
  var MAX_NAME_LENGTH = 25;

  // Находим окно статистики
  var setupPopupElement = document.querySelector('.setup');

  // Находим поле для имени
  var nameFieldElement = setupPopupElement.querySelector('.setup-user-name');

  // Находим своего персонажа в окне статистики и нужные нам элементы (плащ, фаербол и т.д.)
  var wizardElement = setupPopupElement.querySelector('.setup-wizard');
  var wizardEyesElement = wizardElement.querySelector('.wizard-eyes');
  var wizardCoatElement = wizardElement.querySelector('.wizard-coat');
  var wizardFireballElement = setupPopupElement.querySelector('.setup-fireball-wrap');

  // Находим нужные нам скрытые инпуты
  var wizardEyesInputElement = setupPopupElement.querySelector('[name="eyes-color"]');
  var wizardCoatInputElement = setupPopupElement.querySelector('[name="coat-color"]');
  var wizardFireballInputElement = setupPopupElement.querySelector('[name="fireball-color"]');

  // Создаем массив цветов для фаербола
  var fireballColors = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848',
  ];

  // Создаем массив цветов для мантии
  var COAT_COLORS = [
    'rgb(146, 100, 161)',
    'rgb(215, 210, 55)',
    'rgb(241, 43, 107)',
    'rgb(101, 137, 164)',
    'rgb(0, 0, 0)',
    'rgb(215, 210, 55)',
    'rgb(56, 159, 117)',
    'rgb(241, 43, 107)',
  ];

  // Создаем массив цветов для глаз
  var EYES_COLORS = [
    'red',
    'orange',
    'yellow',
    'green',
    'lightblue',
    'blue',
    'purple',
  ];

  // Присваеваем переменной вызов функции и передаем параметры для создания окружения на момент вызова
  // Для цвета фаербола
  var getNextFireballColor = window.utils.getNextNumberFromArray(fireballColors, -1);
  // Для цвета глаз
  var getNextEyeColor = window.utils.getNextNumberFromArray(EYES_COLORS, -1);
  // Для цвета мантии
  var getNextMantleColor = window.utils.getNextNumberFromArray(COAT_COLORS, -1);

  // Функция валидности поля имени
  var nameFieldValidityHandler = function (evt) {
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
  };

  // Этим обработчиком запрещаем всплытие события ( закрытие по ESC ), если таргет = инпут
  nameFieldElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ESC_KEY_CODE) {
      evt.stopPropagation();
    }
  });


  wizardFireballElement.addEventListener('click', function () {
    wizardFireballElement.style.background = getNextFireballColor();
    wizardFireballInputElement.value = wizardFireballElement.style.background;
  });

  // Объявляем переменную для сохранения текущего цвета мантии
  var coatColor = wizardCoatElement.style.fill;
  wizardCoatElement.addEventListener('click', function () {
    coatColor = getNextMantleColor();
    wizardCoatElement.style.fill = coatColor;
    wizardCoatInputElement.value = wizardCoatElement.style.fill;
    window.utils.debounce(window.wizards.update);
  });

  // Объявляем переменную для сохранения текущего цвета глаз
  var eyesColor = wizardEyesElement.style.fill;
  wizardEyesElement.addEventListener('click', function () {
    eyesColor = getNextEyeColor();
    wizardEyesElement.style.fill = eyesColor;
    wizardEyesInputElement.value = wizardEyesElement.style.fill;
    window.utils.debounce(window.wizards.update);
  });

  var getCoatColor = function () {
    return coatColor;
  };

  var getEyeColor = function () {
    return eyesColor;
  };

  // Для передачи в другие модули
  window.user = {
    validate: nameFieldValidityHandler,
    mantleColors: COAT_COLORS,
    eyeColors: EYES_COLORS,
    getCoatColor: getCoatColor,
    getEyeColor: getEyeColor,
  };
})();
