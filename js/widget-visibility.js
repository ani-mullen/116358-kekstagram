'use strict';

window.isWidgetVisibility = (function () {
  var uploadForm = document.querySelector('#upload-select-image');
  var framingForm = document.querySelector('.upload-overlay');
  var onframingFormClose = null;

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

  return {
    openFramingForm: openFramingForm,
    hideFramingForm: hideFramingForm,
    focusUploadForm: focusUploadForm
  };
})();
