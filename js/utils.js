'use strict';

(function () {
  var ESC_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;

  var DEBOUNCE_INTERVAL = 300; // ms

  var lastTimeout;

  var debounceHandler = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };

  // Функция случайного числа в диапазоне
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Функция случайного числа в диапазоне
  var getRandomItem = function (array) {
    return array[getRandomNumber(0, array.length - 1)];
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

  // Функция создания сообщения об ошибке ( при загрузке/отправке данных )
  var showErrorMessageHandler = function (errorMessage) {
    var errorElement = document.createElement('div');
    errorElement.classList.add('error-message');
    errorElement.style.backgroundColor = 'white';
    errorElement.style.color = 'black';
    errorElement.style.textAlign = 'center';
    errorElement.style.position = 'fixed';
    errorElement.style.width = '400px';
    errorElement.style.height = '100px';
    errorElement.style.border = '4px solid black';
    errorElement.style.left = '39%';
    errorElement.style.top = '20%';
    errorElement.style.fontSize = '28px';
    errorElement.style.zIndex = '10';
    errorElement.textContent = errorMessage;
    document.body.appendChild(errorElement);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEY_CODE) {
        errorElement.remove();
      }
    });
  };

  // Для передачи в другие модули
  window.utils = {
    getRandomItem: getRandomItem,
    getNextNumberFromArray: getNextNumberFromArray,
    onError: showErrorMessageHandler,
    ESC_KEY_CODE: ESC_KEY_CODE,
    ENTER_KEY_CODE: ENTER_KEY_CODE,
    debounce: debounceHandler,
  };
})();
