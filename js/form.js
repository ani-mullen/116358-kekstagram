'use strict';

var framingForm = document.querySelector('.upload-overlay');
var framingFormClose = framingForm.querySelector('.upload-form-cancel');
var uploadForm = document.querySelector('#upload-select-image');
var uploadImageName = document.querySelector('#upload-file');
window.imagePreview = framingForm.querySelector('.filter-image-preview');
var imageFilter = framingForm.querySelector('.upload-filter-controls');

var ENTER_KEY_CODE = 13;
var ESCAPE_KEY_CODE = 27;

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
  document.addEventListener('keydown', KeydownHandler);
});

// Функция определения ENTER_KEY_CODE
window.isActivateEvent = function (evt) {
  return evt.keyCode && evt.keyCode === ENTER_KEY_CODE;
};

// Функция определения клика
window.isClickEvent = function (evt) {
  return evt.type === 'click';
};

// Обработчик нажатий на клавиатуру (ESC)
var KeydownHandler = function (evt) {
  if (evt.keyCode === ESCAPE_KEY_CODE) {
    toggle();
  }
};

// Функция скрытия редактора
var hideFramingForm = function () {
  framingForm.classList.add('invisible');
  uploadForm.classList.remove('invisible');
  window.imagePreview.className = 'filter-image-preview';
  window.createScale(window.resizeValue, 0, 100); // очистка resize картинки
  document.removeEventListener('keydown', KeydownHandler);
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
    window.ariaRoleToggle(framingFormClose, 'aria-pressed');
  }
});

imageFilter.addEventListener('click', window.initializeFilters);
imageFilter.addEventListener('keydown', window.initializeFilters);

// масштабирование
window.createScale(window.resizeValue, 0, 100);
