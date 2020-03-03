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

  // Функция открытия окна похожих магов
  var showMages = function () {
    magesFieldElement.classList.remove('hidden');
  };

  // Функция заполнения html-элементов похожего мага ( цвет,имя и т.д )
  var createElements = function (wizard) {
    var wizardElement = template.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat; // Переделали, так как в данных сервера именно такое свойство
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes; // Белым цветом потому, что пока этих данных нет, но они придут с сервера

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

  // Функция установки ранга похожим магам
  var getRank = function (mage) {
    var rank = 0;
    if (mage.colorCoat === window.user.coatColor) {
      rank += 2;
    }
    if (mage.colorEyes === window.user.eyesColor) {
      rank += 1;
    }
    return rank;
  };

  var update = function () {
    render(similarMages.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = similarMages.indexOf(left) - similarMages.indexOf(right);
      }
      return rankDiff;
    }));
  };

  // Загружаем данные и при положительном результате отрисовываем волшебников
  window.backend.load(successHandler, window.utils.onError);

  // Для передачи в другие модули
  window.wizards = {
    show: showMages,
    update: update,
  };
})();
