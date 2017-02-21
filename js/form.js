'use strict';

var imagePreview = document.querySelector('.filter-image-preview');

// Изменение масштаба
var scaleClickHandler = function (scaleNumber) {
  imagePreview.style.transform = 'scale(' + scaleNumber + ')';
};

// Изменени фильтра
var filterClickHandler = function (nameFilter) {
  imagePreview.className = 'filter-image-preview'; // сброс классов-фильтров
  imagePreview.classList.add('filter-' + nameFilter);
};

var resetScale = window.createScale(document.querySelector('.upload-resize-controls'), scaleClickHandler); // масштабирование
var resetFilter = window.initializeFilters(document.querySelector('.upload-filter-controls'), filterClickHandler); // переключение фильтров
window.pictures();

// Переключение виджетов
(function () {
  var framingFormClose = document.querySelector('.upload-form-cancel');
  var uploadImageName = document.querySelector('#upload-file');
  var uploadImageLabel = document.querySelector('.upload-file');

  // Обработчик нажатия на форму загрузки
  uploadImageLabel.addEventListener('keydown', function (evt) {
    if ((window.assist.isActivationEvent(evt)) && (evt.target.tagName === 'LABEL')) {
      uploadImageName.click();
      window.isWidgetVisibility.focusUploadForm(function () {
        uploadImageLabel.focus();
      });
    }
  });

  // Обработчик загрузки картинки
  uploadImageName.addEventListener('change', function () {
    window.isWidgetVisibility.openFramingForm();
    uploadImageName.value = (''); // очистка названия картинки


    window.ariaRole.ariaRoleToggle(uploadImageLabel, 'aria-pressed'); // изменение значения aria-pressed кнопки uploadImageLabel
    framingFormClose.setAttribute('aria-pressed', false); // очистка значения aria-pressed для framingFormClose
  });

  var clearValues = function () {
    window.ariaRole.ariaRoleToggle(framingFormClose, 'aria-pressed'); // изменение значения aria-pressed кнопки framingFormClose
    uploadImageLabel.setAttribute('aria-pressed', false); // очистка значения aria-pressed для uploadImageLabel
    resetScale();
    resetFilter();
  };
  // Обработчик клика на крест
  framingFormClose.addEventListener('click', function () {
    window.isWidgetVisibility.hideFramingForm();
    clearValues();
  });

  // Обработчик нажатия на крест
  framingFormClose.addEventListener('keydown', function (evt) {
    if (window.assist.isActivationEvent(evt)) {
      window.isWidgetVisibility.hideFramingForm();
      clearValues();
    }
  });
})();
