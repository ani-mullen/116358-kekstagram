'use strict';

(function () {
  var uploadForm = document.querySelector('#upload-select-image');
  var framingForm = document.querySelector('.upload-overlay');
  var onframingFormClose = null;
  var framingFormClose = document.querySelector('.upload-form-cancel');
  var uploadImageName = document.querySelector('#upload-file');
  var uploadImageLabel = document.querySelector('.upload-file');
  var imagePreview = document.querySelector('.filter-image-preview');

  function toggleWidgets() {
    uploadForm.classList.toggle('invisible');
    framingForm.classList.toggle('invisible');
  }

  // Если нажали на Esc
  function onKeyDownEsc(evt) {
    if (window.assist.isDeactivationEvent(evt)) {
      toggleWidgets();
    }
  }
  // Функция переключения видимости загрузчика и редактора
  function openFramingForm() {
    toggleWidgets();
    document.addEventListener('keydown', onKeyDownEsc);
  }

  // Функция скрытия редактора
  function hideFramingForm() {
    framingForm.classList.add('invisible');
    uploadForm.classList.remove('invisible');
    document.removeEventListener('keydown', onKeyDownEsc);

    if (typeof onframingFormClose === 'function') {
      onframingFormClose();
    }
  }

  function focusUploadForm(callback) {
    onframingFormClose = callback;
  }

  // Обработчик нажатия на форму загрузки
  uploadImageLabel.addEventListener('keydown', function (evt) {
    if ((window.assist.isActivationEvent(evt)) && (evt.target.tagName === 'LABEL')) {
      uploadImageName.click();
      focusUploadForm(function () {
        uploadImageLabel.focus();
      });
    }
  });

  // Обработчик загрузки картинки
  uploadImageName.addEventListener('change', function () {
    openFramingForm();
    uploadImageName.value = (''); // очистка названия картинки
    window.createScale(document.querySelector('.upload-resize-controls'), scaleClickHandler); // масштабирование
    window.initializeFilters(document.querySelector('.upload-filter-controls'), filterClickHandler); // переключение фильтров
    window.ariaRole.ariaRoleToggle(uploadImageLabel, 'aria-pressed'); // изменение значения aria-pressed кнопки uploadImageLabel
    framingFormClose.setAttribute('aria-pressed', false); // очистка значения aria-pressed для framingFormClose
  });

  function clearValues() {
    window.ariaRole.ariaRoleToggle(framingFormClose, 'aria-pressed'); // изменение значения aria-pressed кнопки framingFormClose
    uploadImageLabel.setAttribute('aria-pressed', false); // очистка значения aria-pressed для uploadImageLabel
    window.createScale(document.querySelector('.upload-resize-controls'), scaleClickHandler)();
    window.initializeFilters(document.querySelector('.upload-filter-controls'), filterClickHandler)();
  }

  // Обработчик клика на крест
  framingFormClose.addEventListener('click', function () {
    hideFramingForm();
    clearValues();
  });

  // Обработчик нажатия на крест
  framingFormClose.addEventListener('keydown', function (evt) {
    if (window.assist.isActivationEvent(evt)) {
      hideFramingForm();
      clearValues();
    }
  });

  // Изменение масштаба
  function scaleClickHandler(scaleNumber) {
    imagePreview.style.transform = 'scale(' + scaleNumber + ')';
  }

  // Изменение фильтра
  function filterClickHandler(nameFilter) {
    imagePreview.className = 'filter-image-preview'; // сброс классов-фильтров
    imagePreview.classList.add('filter-' + nameFilter);
  }

  window.pictures();
})();
