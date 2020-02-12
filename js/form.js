'use strict';

(function () {
  var MIN_NAME_LENGTH = 2;
  var MAX_NAME_LENGTH = 25;

  // Находим окно статистики
  var setup = document.querySelector('.setup');

  // Находим поле для имени
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
  var fireballColorCount = window.util.getNextNumberFromArray(fireballColors, -1);
  // Для цвета глаз
  var eyeColorCount = window.util.getNextNumberFromArray(eyeColors, -1);

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
  userNameField.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ESC_KEY) {
      evt.stopPropagation();
    }
  });

  userWizardFireball.addEventListener('click', function () {
    userWizardFireball.style.background = fireballColorCount();
    userWizardFireballInput.value = userWizardFireball.style.background;
  });

  userWizardCoat.addEventListener('click', function () {
    userWizardCoat.style.fill = window.util.getRandomItem(mantleColors);
    userWizardCoatInput.value = userWizardCoat.style.fill;
  });

  userWizardEyes.addEventListener('click', function () {
    userWizardEyes.style.fill = eyeColorCount();
    userWizardEyesInput.value = userWizardEyes.style.fill;
  });

  // Для передачи в другие модули
  window.form = {
    userNameFieldValidityHandler: userNameFieldValidityHandler,
    mantleColors: mantleColors,
    eyeColors: eyeColors
  };
})();
