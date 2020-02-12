'use strict';

(function () {
  var ESC_KEY = 27;
  var ENTER_KEY = 13;

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

  // Для передачи в другие модули
  window.util = {
    getRandomItem: getRandomItem,
    getNextNumberFromArray: getNextNumberFromArray,
    ESC_KEY: ESC_KEY,
    ENTER_KEY: ENTER_KEY
  };
})();
