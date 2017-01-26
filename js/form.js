'use strict';

var framingForm = document.querySelector('.upload-overlay');
var framingFormClose = framingForm.querySelector('.upload-form-cancel');
var uploadForm = document.querySelector('#upload-select-image');
var uploadImageName = document.querySelector('#upload-file');
var imagePreview = framingForm.querySelector('.filter-image-preview');
var buttons = framingForm.querySelector('.upload-filter');
var resizeValue = framingForm.querySelector('.upload-resize-controls-value');
var resizeValueDec = framingForm.querySelector('.upload-resize-controls-button-dec');
var resizeValueInc = framingForm.querySelector('.upload-resize-controls-button-inc');

var toggle = function (x) {
  x.addEventListener('click', function () {
    uploadForm.classList.toggle('invisible');
    framingForm.classList.toggle('invisible');
  });
};

toggle(uploadImageName);
toggle(framingFormClose);

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

var valueScaleResize = function () {
  var scaleNumber = resizeNumber / 100;
  resizeValue.value = resizeNumber + '%';
  imagePreview.style.transform = 'scale(' + scaleNumber + ')';
};

resizeValueDec.addEventListener('click', function () {
  if (resizeNumber > 25) {
    resizeNumber -= 25;
    valueScaleResize();
  }
});

resizeValueInc.addEventListener('click', function () {
  if (resizeNumber < 100) {
    resizeNumber += 25;
    valueScaleResize();
  }
});
