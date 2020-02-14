'use strict';

(function () {
  var MIN_NAME_LENGTH = 2;
  var MAX_NAME_LENGTH = 25;

  // Находим окно статистики
  var setupElement = document.querySelector('.setup');

  // Находим поле для имени
  var userNameFieldElement = setupElement.querySelector('.setup-user-name');

  // Находим своего персонажа в окне статистики и нужные нам элементы (плащ, фаербол и т.д.)
  var userWizardElement = setupElement.querySelector('.setup-wizard');
  var userWizardEyesElement = userWizardElement.querySelector('.wizard-eyes');
  var userWizardCoatElement = userWizardElement.querySelector('.wizard-coat');
  var userWizardFireballElement = setupElement.querySelector('.setup-fireball-wrap');

  // Находим нужные нам скрытые инпуты
  var userWizardEyesInputElement = setupElement.querySelector('[name="eyes-color"]');
  var userWizardCoatInputElement = setupElement.querySelector('[name="coat-color"]');
  var userWizardFireballInputElement = setupElement.querySelector('[name="fireball-color"]');

  // Создаем массив цветов для фаербола
  var fireballColors = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848',
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

  // Присваеваем переменной вызов функции и передаем параметры для создания окружения на момент вызова
  // Для цвета фаербола
  var getNextFireballColor = window.utils.getNextNumberFromArray(fireballColors, -1);
  // Для цвета глаз
  var getNextEyeColor = window.utils.getNextNumberFromArray(eyeColors, -1);
  // Для цвета мантии
  var getNextMantleColor = window.utils.getNextNumberFromArray(mantleColors, -1);

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
  };

  // Этим обработчиком запрещаем всплытие события ( закрытие по ESC ), если таргет = инпут
  userNameFieldElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ESC_KEY_CODE) {
      evt.stopPropagation();
    }
  });

  userWizardFireballElement.addEventListener('click', function () {
    userWizardFireballElement.style.background = getNextFireballColor();
    userWizardFireballInputElement.value = userWizardFireballElement.style.background;
  });

  userWizardCoatElement.addEventListener('click', function () {
    userWizardCoatElement.style.fill = getNextMantleColor();
    userWizardCoatInputElement.value = userWizardCoatElement.style.fill;
  });

  userWizardEyesElement.addEventListener('click', function () {
    userWizardEyesElement.style.fill = getNextEyeColor();
    userWizardEyesInputElement.value = userWizardEyesElement.style.fill;
  });

  // Для передачи в другие модули
  window.user = {
    validate: userNameFieldValidityHandler,
    mantleColors: mantleColors,
    eyeColors: eyeColors,
  };
})();
