'use strict';
(function () {
  // Ограничение окна по координатам
  var setupRestriction = {
    COORDS_MIN_Y: 10,
    COORDS_MAX_Y: 800,
    COORDS_MIN_X: 410,
    COORDS_MAX_X: 1490,
  };

  // Находим окно статистики
  var setupElement = document.querySelector('.setup');

  // Находим блок с фото пользователя для открытия окна статистики
  var setupOpenButtonElement = document.querySelector('.setup-open-icon');

  // Находим кнопку для закрытия окна статистики
  var setupCloseButtonElement = setupElement.querySelector('.setup-close');

  // Находим поле для имени
  var userNameFieldElement = setupElement.querySelector('.setup-user-name');

  // Находим блок , за который будем перемещать окно статистики
  var uploadFieldElement = setupElement.querySelector('.upload');

  // Функция закрытия окна по нажатию ESC
  var onEscCloseSetupHandler = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEY_CODE) {
      hideSetupWindowHandler();
    }
  };

  // Функция открытия окна статистики
  var showSetupWindowHandler = function () {
    document.addEventListener('keydown', onEscCloseSetupHandler);
    window.wizards.show();
    setupElement.classList.remove('hidden');

  };

  // Функция закрытия окна статистики
  var hideSetupWindowHandler = function () {
    setupElement.classList.add('hidden');
    document.removeEventListener('keydown', onEscCloseSetupHandler);
  };

  userNameFieldElement.addEventListener('input', function (evt) {
    window.user.validate(evt);
  });

  setupOpenButtonElement.addEventListener('click', showSetupWindowHandler);
  setupOpenButtonElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEY_CODE) {
      showSetupWindowHandler();
    }
  });

  setupCloseButtonElement.addEventListener('click', hideSetupWindowHandler);
  setupCloseButtonElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEY_CODE) {
      hideSetupWindowHandler();
    }
  });

  // Обработчик для перемещения окна статистики
  uploadFieldElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var dragged = false;

    // Находим координаты нажатия мыши
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };


    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      // Находим координаты движения ( стартовые - нынешние )
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      // Перезаписываем стартовые
      startCoords.x = moveEvt.clientX;
      startCoords.y = moveEvt.clientY;

      if (((setupElement.offsetTop - shift.y) > setupRestriction.COORDS_MIN_Y) && ((setupElement.offsetTop - shift.y) < setupRestriction.COORDS_MAX_Y)) {
        setupElement.style.top = (setupElement.offsetTop - shift.y) + 'px';
      }

      if (((setupElement.offsetLeft - shift.x) > setupRestriction.COORDS_MIN_X) && ((setupElement.offsetLeft - shift.x) < setupRestriction.COORDS_MAX_X)) {
        setupElement.style.left = (setupElement.offsetLeft - shift.x) + 'px';
      }
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      if (dragged) {
        var clickPreventDefaultHandler = function (clickEvt) {
          clickEvt.preventDefault();
          uploadFieldElement.removeEventListener('click', clickPreventDefaultHandler);
        };
        uploadFieldElement.addEventListener('click', clickPreventDefaultHandler);
      }

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });
})();


