'use strict';

(function () {
  // Колличество похожих магов
  var MAX_MAGES_COUNT = 4;

  // Находим окно с похожими магами
  var magesFieldElement = document.querySelector('.setup-similar');

  // Находим список похожих магов
  var listElement = document.querySelector('.setup-similar-list');

  // Находим шаблон для копирования магов
  var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  // Пустой массив для сохранения данных о магах
  var similarMages = [];

  /*
  // Создаем массив имен похожих магов
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

  // Создаем массив фамилий похожих магов
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
   */

  // Функция открытия окна похожих магов
  var showMages = function () {
    magesFieldElement.classList.remove('hidden');
  };

  /*
  // Функция создания похожих магов и добавления их в массив
  var create = function (number) {
    var wizardsArr = [];
    for (var i = 1; i <= number; i++) {
      var wizard = {
        name: window.utils.getRandomItem(names) + ' ' + window.utils.getRandomItem(secondNames),
        coatColor: window.utils.getRandomItem(window.user.mantleColors),
        eyesColor: window.utils.getRandomItem(window.user.eyeColors),
      };
      wizardsArr.push(wizard);
    }
    return wizardsArr;
  };
*/

  // Функция заполнения html-элементов похожего мага ( цвет,имя и т.д )
  var createElements = function (wizard) {
    var wizardElement = template.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat; // Переделали, так как в данных сервера именно такое свойство
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor; // Белым цветом потому, что пока этих данных нет, но они придут с сервера

    return wizardElement;
  };

  // Функция рендоринга магов на странице
  var render = function (wizardObjects) {
    var fragment = document.createDocumentFragment();
    listElement.innerHTML = '';
    for (var t = 0; t < MAX_MAGES_COUNT; t++) {
      fragment.appendChild(createElements(window.utils.getRandomItem(wizardObjects)));
    }
    listElement.appendChild(fragment);
  };

  // Функция приема данных с сервера и сохранения их в массив
  var successHandler = function (data) {
    similarMages = data;
    update();
  };

  var update = function () {
    var sameCoatMages = similarMages.filter(function (it) {
      return it.colorCoat === window.user.coatColor;
    });
    var sameEyesMages = similarMages.filter(function (it) {
      return it.colorEyes === window.user.eyesColor;
    });

    var filteredMages = sameCoatMages.concat(sameEyesMages);

    var uniqueMages = filteredMages.filter(function (it, i) {
      return filteredMages.indexOf(it) === i;
    });

    render(uniqueMages);
  };

  // Загружаем данные и при положительном результате отрисовываем волшебников
  window.backend.load(successHandler, window.utils.onError);

  // Для передачи в другие модули
  window.wizards = {
    show: showMages,
    update: update,
  };
})();
