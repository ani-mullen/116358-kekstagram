'use strict';

var framingForm = document.querySelector('.upload-overlay');
var framingFormClose = framingForm.querySelector('.upload-form-cancel');
var uploadForm = document.querySelector('#upload-select-image');
var uploadImageName = document.querySelector('#upload-file');
window.imagePreview = framingForm.querySelector('.filter-image-preview');
var imageFilter = framingForm.querySelector('.upload-filter-controls');

// Функция переключения видимости загрузчика и редактора
var toggle = function () {
  uploadForm.classList.toggle('invisible');
  framingForm.classList.toggle('invisible');
};

// Обработчик загрузки картинки
uploadImageName.addEventListener('change', function () {
  uploadImageName.value = (''); // очистка названия картинки
  toggle();
  framingFormClose.setAttribute('aria-pressed', false); // очистка значения aria-роли для framingFormClose
  document.addEventListener('keydown', window.KeydownHandler);
});

// Функция определения ENTER_KEY_CODE
window.isActivateEvent = (function () {
  var ENTER_KEY_CODE = 13;
  return function (evt) {
    return evt.keyCode && evt.keyCode === ENTER_KEY_CODE;
  };
})();

// Функция определения клика
window.isClickEvent = (function () {
  return function (evt) {
    return evt.type === 'click';
  };
})();

// Обработчик нажатий на клавиатуру (ESC)
window.KeydownHandler = (function () {
  var ESCAPE_KEY_CODE = 27;
  return function (evt) {
    if (evt.keyCode === ESCAPE_KEY_CODE) {
      toggle();
    }
  };
})();

// Функция скрытия редактора
var hideFramingForm = function () {
  framingForm.classList.add('invisible');
  uploadForm.classList.remove('invisible');
  window.imagePreview.className = 'filter-image-preview'; // сброс классов-фильтров
  window.createScale(window.resizeValue, 0, 100); // очистка resize картинки
  window.ariaRoleToggle(framingFormClose, 'aria-pressed');
  window.initializeFilters.ariaRoleFilterCheckedFalse();
  window.initializeFilters.ariaRoleFilterNoneTrue();
  document.removeEventListener('keydown', window.KeydownHandler);
};

// Обработчик клика на крест
framingFormClose.addEventListener('click', function () {
  hideFramingForm();
  window.ariaRoleToggle(framingFormClose, 'aria-pressed');
});

// Обработчик нажатия на крест
framingFormClose.addEventListener('keydown', function (evt) {
  if (window.isActivateEvent(evt)) {
    hideFramingForm();
  }
});

imageFilter.addEventListener('click', window.initializeFilters.toggleFilter);
imageFilter.addEventListener('keydown', window.initializeFilters.toggleFilter);

// масштабирование
window.createScale(window.resizeValue, 0, 100);
