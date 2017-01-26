'use strict';

var framingForm = document.querySelector('.upload-overlay');
var framingFormClose = framingForm.querySelector('.upload-form-cancel');
var uploadForm = document.querySelector('#upload-select-image');
var uploadImageName = document.querySelector('#upload-file');
var imagePreview = document.querySelector('.filter-image-preview');
var buttons = document.querySelector('.upload-filter');
var resizeValue = document.querySelector('.upload-resize-controls-value');
var resizeValueDec = document.querySelector('.upload-resize-controls-button-dec');
var resizeValueInc = document.querySelector('.upload-resize-controls-button-inc');

uploadImageName.addEventListener('change', function () {
  uploadForm.classList.add('invisible');
  framingForm.classList.remove('invisible');
});

framingFormClose.addEventListener('click', function () {
  framingForm.classList.add('invisible');
  uploadForm.classList.remove('invisible');
});

function filter(event) {
  imagePreview.className = 'filter-image-preview';
  var filterName = 'filter-' + event.target.value;
  imagePreview.classList.add(filterName);
}

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('change', filter);
}

var resizeNumber = 100;
resizeValue.value = resizeNumber + '%';

resizeValueDec.addEventListener('click', function () {
  if (resizeNumber > 0) {
    resizeNumber -= 25;
    var scaleNumber = resizeNumber / 100;
    resizeValue.value = resizeNumber + '%';
    imagePreview.style.transform = 'scale(' + scaleNumber + ')';
  }
});

resizeValueInc.addEventListener('click', function () {
  if (resizeNumber < 100) {
    resizeNumber += 25;
    var scaleNumber = resizeNumber / 100;
    resizeValue.value = resizeNumber + '%';
    imagePreview.style.transform = 'scale(' + scaleNumber + ')';
  }
});

