'use strict';
(function () {
  // Ограничение окна по координатам
  var moveRestriction = {
    COORDS_MIN_Y: 10,
    COORDS_MAX_Y: 800,
    COORDS_MIN_X: 410,
    COORDS_MAX_X: 1490,
  };

  // Находим окно статистики
  var popupElement = document.querySelector('.setup');

  // Находим блок с фото пользователя для открытия окна статистики
  var openPopupElement = document.querySelector('.setup-open-icon');

  // Находим кнопку для закрытия окна статистики
  var closePopupElement = popupElement.querySelector('.setup-close');

  // Находим поле для имени
  var userNameFieldElement = popupElement.querySelector('.setup-user-name');

  // Находим блок , за который будем перемещать окно статистики
  var uploadFieldElement = popupElement.querySelector('.upload');

  // Находим форму
  var formElement = popupElement.querySelector('.setup-wizard-form');

  // Функция закрытия окна по нажатию ESC
  var onEscClosePopupHandler = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEY_CODE) {
      hidePopupWindowHandler();
    }
  };

  // Функция открытия окна статистики
  var showPopupWindowHandler = function () {
    document.addEventListener('keydown', onEscClosePopupHandler);
    window.wizards.show();
    popupElement.classList.remove('hidden');

  };

  // Функция закрытия окна статистики
  var hidePopupWindowHandler = function () {
    popupElement.classList.add('hidden');
    document.removeEventListener('keydown', onEscClosePopupHandler);
  };

  userNameFieldElement.addEventListener('input', function (evt) {
    window.user.validate(evt);
  });

  openPopupElement.addEventListener('click', showPopupWindowHandler);
  openPopupElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEY_CODE) {
      showPopupWindowHandler();
    }
  });

  closePopupElement.addEventListener('click', hidePopupWindowHandler);
  closePopupElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEY_CODE) {
      hidePopupWindowHandler();
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

      if (((popupElement.offsetTop - shift.y) > moveRestriction.COORDS_MIN_Y) && ((popupElement.offsetTop - shift.y) < moveRestriction.COORDS_MAX_Y)) {
        popupElement.style.top = (popupElement.offsetTop - shift.y) + 'px';
      }

      if (((popupElement.offsetLeft - shift.x) > moveRestriction.COORDS_MIN_X) && ((popupElement.offsetLeft - shift.x) < moveRestriction.COORDS_MAX_X)) {
        popupElement.style.left = (popupElement.offsetLeft - shift.x) + 'px';
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

  // Обработчик для отправки формы
  formElement.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(formElement), hidePopupWindowHandler, window.utils.onError);
    evt.preventDefault();
  });
})();
