'use strict';
(function () {
  // Находим окно статистики
  var setup = document.querySelector('.setup');

  // Находим блок с фото пользователя для открытия окна статистики
  var setupOpenButton = document.querySelector('.setup-open-icon');

  // Находим кнопку для закрытия окна статистики
  var setupCloseButton = setup.querySelector('.setup-close');

  // Находим поле для имени
  var userNameField = setup.querySelector('.setup-user-name');

  // Находим блок , за который будем перемещать окно статистики
  var uploadField = setup.querySelector('.upload');

  // Функция закрытия окна по нажатию ESC
  var onEscCloseSetupHandler = function (evt) {
    if (evt.keyCode === window.util.ESC_KEY) {
      hideSetupWindowHandler();
    }
  };

  // Функция открытия окна статистики
  var showSetupWindowHandler = function () {
    document.addEventListener('keydown', onEscCloseSetupHandler);
    setup.classList.remove('hidden');
    userNameField.addEventListener('input', window.form.userNameFieldValidityHandler);
  };

  // Функция закрытия окна статистики
  var hideSetupWindowHandler = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onEscCloseSetupHandler);
  };

  setupOpenButton.addEventListener('click', showSetupWindowHandler);
  setupOpenButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEY) {
      showSetupWindowHandler();
    }
  });

  setupCloseButton.addEventListener('click', hideSetupWindowHandler);
  setupCloseButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEY) {
      hideSetupWindowHandler();
    }
  });

  // Обработчик для перемещения окна статистики
  uploadField.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var dragged = false;

    // Находим координаты нажатия мыши
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      // Находим координаты движения ( стартовые - нынешние )
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      // Перезаписываем стартовые

      startCoords.x = moveEvt.clientX;
      startCoords.y = moveEvt.clientY;

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      if (dragged) {
        var clickPreventDefaultHandler = function (clickEvt) {
          clickEvt.preventDefault();
          uploadField.removeEventListener('click', clickPreventDefaultHandler);
        };
        uploadField.addEventListener('click', clickPreventDefaultHandler);
      }

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });
})();


