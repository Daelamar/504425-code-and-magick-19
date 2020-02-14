'use strict';

(function () {
  // Колличество похожих магов
  var SIMILAR_WIZARDS = 4;

  // Находим окно с похожими магами
  var setupWizardsElement = document.querySelector('.setup-similar');

  // Находим список похожих магов
  var wizardListElement = document.querySelector('.setup-similar-list');

  // Находим шаблон для копирования магов
  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

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

  // Функция открытия окна похожих магов
  var showSimilarWizardsBlock = function () {
    setupWizardsElement.classList.remove('hidden');
  };

  // Функция создания похожих магов и добавления их в массив
  var createWizards = function (number) {
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

  // Функция заполнения html-элементов похожего мага ( цвет,имя и т.д )
  var createWizardElement = function (wizard) {
    var wizardElement = wizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  // Функция рендоринга магов на странице
  var renderSimilarWizards = function (wizardObjects) {
    var fragment = document.createDocumentFragment();
    for (var t = 0; t < wizardObjects.length; t++) {
      fragment.appendChild(createWizardElement(wizardObjects[t]));
    }
    wizardListElement.appendChild(fragment);
  };

  // Функция для отображения магов на страницы ( для дальнейшей передачи в глобальную ОВ )
  var show = function () {
    renderSimilarWizards(createWizards(SIMILAR_WIZARDS));
  };

  showSimilarWizardsBlock();

  // Для передачи в другие модули
  window.wizards = {
    show: show,
  };
})();
