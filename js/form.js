'use strict';

var framingForm = document.querySelector('.upload-overlay');
var framingFormClose = framingForm.querySelector('.upload-form-cancel');
var uploadForm = document.querySelector('#upload-select-image');
var uploadImageName = document.querySelector('#upload-file');
var imagePreview = framingForm.querySelector('.filter-image-preview');
var imageFilter = framingForm.querySelector('.upload-filter-controls');
var resizeValue = framingForm.querySelector('.upload-resize-controls-value');
var resizeValueDec = framingForm.querySelector('.upload-resize-controls-button-dec');
var resizeValueInc = framingForm.querySelector('.upload-resize-controls-button-inc');

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
var isActivateEvent = function (evt) {
  return evt.keyCode && evt.keyCode === ENTER_KEY_CODE;
};

// Функция определения клика
var isClickEvent = function (evt) {
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
  imagePreview.className = 'filter-image-preview';
  imageResize(100); // очистка resize картинки
  document.removeEventListener('keydown', KeydownHandler);
};

// Функция изменения значения Aria роли
var ariaRoleToggle = function (item, valueAttribute) {
  var booleanValue = (item.getAttribute('valueAttribute') === 'true');
  item.setAttribute(valueAttribute, !booleanValue);
};

// Обработчик клика на крест
framingFormClose.addEventListener('click', function () {
  hideFramingForm();
  ariaRoleToggle(framingFormClose, 'aria-pressed');
});

// Обработчик нажатия на крест
framingFormClose.addEventListener('keydown', function (evt) {
  if (isActivateEvent(evt)) {
    hideFramingForm();
    ariaRoleToggle(framingFormClose, 'aria-pressed');
  }
});

function filterChange(evt) {
  var element = evt.target.parentNode;
  var elementTagName = element.tagName;
  if ((isClickEvent(evt) || isActivateEvent(evt)) && (elementTagName === 'LABEL')) {
    var nameFilter = document.getElementById(element.htmlFor).value;
    imagePreview.className = 'filter-image-preview';
    imagePreview.classList.add('filter-' + nameFilter);
    ariaCheckedFalse();
    ariaRoleToggle(evt.target, 'aria-checked');
  }
  // обнуление aria-checked
  function ariaCheckedFalse() {
    var first = document.querySelectorAll('.upload-filter-preview');
    for (var i = 0; i < first.length; i++) {
      first[i].setAttribute('aria-checked', false);
    }
  }
}

imageFilter.addEventListener('click', filterChange);
imageFilter.addEventListener('keydown', filterChange);

// масштабирование
imageResize(100);

function imageResize(resizeNumber) {
  resizeValue.value = resizeNumber + '%';
  resizeValue.setAttribute('value', resizeValue.value);
  var scaleNumber = resizeNumber / 100;
  imagePreview.style.transform = 'scale(' + scaleNumber + ')';
}

function valueImageResize(step) {
  var resizeNumber = parseInt(resizeValue.value, 10);
  resizeNumber += step;
  if (resizeNumber >= 25 && resizeNumber <= 100) {
    imageResize(resizeNumber);
  }
}

resizeValueDec.addEventListener('click', function () {
  valueImageResize(-25);
});

resizeValueInc.addEventListener('click', function () {
  valueImageResize(25);
});

