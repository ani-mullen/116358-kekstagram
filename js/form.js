'use strict';

var imagePreview = document.querySelector('.filter-image-preview');

// Переключение виджетов
(function () {
  var framingFormClose = document.querySelector('.upload-form-cancel');
  var uploadImageName = document.querySelector('#upload-file');
  var uploadImageLabel = document.querySelector('.upload-file');

  // Обработчик нажатия на форму загрузки
  uploadImageLabel.addEventListener('keydown', function (evt) {
    if ((window.assist.isActivationEvent(evt)) && (evt.target.tagName === 'LABEL')) {
      uploadImageName.click();
      window.isWidgetVisibility.focusSetupOpen(function () {
        uploadImageLabel.focus();
      });
    }
  });

  // Обработчик загрузки картинки
  uploadImageName.addEventListener('change', function () {
    window.isWidgetVisibility.openFramingForm();
    uploadImageName.value = (''); // очистка названия картинки
    document.querySelector('#upload-filter-none').click(); // подстветка первого фильтра

    window.ariaRoleToggle(uploadImageLabel, 'aria-pressed'); // изменение значения aria-pressed кнопки uploadImageLabel
    framingFormClose.setAttribute('aria-pressed', false); // очистка значения aria-pressed для framingFormClose
  });

  var clearValues = function () {
    imagePreview.className = 'filter-image-preview'; // сброс классов-фильтров
    window.scaling.resetScale(); // сброс масштаба
    window.initializeFilters.ariaRoleFilterCheckedFalse(); // обнуление aria-checked у всех фильтров

    window.ariaRoleToggle(framingFormClose, 'aria-pressed'); // изменение значения aria-pressed кнопки framingFormClose
    uploadImageLabel.setAttribute('aria-pressed', false); // очистка значения aria-pressed для uploadImageLabel
    window.initializeFilters.ariaRoleFilterNoneTrue(); // возвращение aria-checked = true первому выбранному фильтру
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

// Изменение масштаба
window.scaling = (function () {
  var resizeValue = document.querySelector('.upload-resize-controls-value');
  var resizeValueDec = document.querySelector('.upload-resize-controls-button-dec');
  var resizeValueInc = document.querySelector('.upload-resize-controls-button-inc');

  var scale = function (scaleNumber) {
    imagePreview.style.transform = 'scale(' + scaleNumber + ')';
  };

  resizeValueDec.addEventListener('click', function () {
    var currentValue = parseInt(resizeValue.value, 10);
    window.createScale(resizeValue, -25, currentValue, scale);
  });

  resizeValueInc.addEventListener('click', function () {
    var currentValue = parseInt(resizeValue.value, 10);
    window.createScale(resizeValue, 25, currentValue, scale);
  });

  return {
    resetScale: function () {
      window.createScale(resizeValue, 0, 100, scale);
    }
  };
})();

window.scaling.resetScale(); // сброс масштаба

// Переключение фильтров
(function () {
  var imageFilter = document.querySelector('.upload-filter-controls');

  var addFilter = function (nameFilter) {
    imagePreview.className = 'filter-image-preview'; // сброс классов-фильтров
    imagePreview.classList.add('filter-' + nameFilter);
  };

  imageFilter.addEventListener('click', function (evt) {
    window.initializeFilters.toggleFilter(evt, addFilter);
  });
  imageFilter.addEventListener('keydown', function (evt) {
    window.initializeFilters.toggleFilter(evt, addFilter);
  });
})();
