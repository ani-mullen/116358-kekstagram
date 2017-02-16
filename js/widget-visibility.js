'use strict';

window.isWidgetVisibility = (function () {
  var uploadForm = document.querySelector('#upload-select-image');
  var framingForm = document.querySelector('.upload-overlay');
  var onframingFormClose = null;

  var toggleWidgets = function () {
    uploadForm.classList.toggle('invisible');
    framingForm.classList.toggle('invisible');
  };
  // Функция переключения видимости загрузчика и редактора
  var openFramingForm = function () {
    toggleWidgets();
    document.addEventListener('keydown', onKeyDownEsc);
  };
  // Если нажали на Esc
  var onKeyDownEsc = function (evt) {
    if (window.assist.isDeactivationEvent(evt)) {
      toggleWidgets();
    }
  };

  // Функция скрытия редактора
  var hideFramingForm = function () {
    framingForm.classList.add('invisible');
    uploadForm.classList.remove('invisible');
    document.removeEventListener('keydown', onKeyDownEsc);

    if (typeof onframingFormClose === 'function') {
      onframingFormClose();
    }
  };

  var focusUploadForm = function (callback) {
    onframingFormClose = callback;
  };

  return {
    openFramingForm: openFramingForm,
    hideFramingForm: hideFramingForm,
    focusUploadForm: focusUploadForm
  };
})();
