'use strict';
window.resizeValue = document.querySelector('.upload-resize-controls-value');

// масштабирование
window.createScale = (function () {

  return function (element, step, currentValue) {
    currentValue += step;
    if (currentValue >= 25 && currentValue <= 100) {
      element.value = currentValue + '%';
      element.setAttribute('value', element.value);
      var scaleNumber = currentValue / 100;
      window.imagePreview.style.transform = 'scale(' + scaleNumber + ')';
    }
  };
})();

(function () {
  var resizeValueDec = document.querySelector('.upload-resize-controls-button-dec');
  var resizeValueInc = document.querySelector('.upload-resize-controls-button-inc');

  resizeValueDec.addEventListener('click', function () {
    var currentValue = parseInt(window.resizeValue.value, 10);
    window.createScale(window.resizeValue, -25, currentValue);
  });

  resizeValueInc.addEventListener('click', function () {
    var currentValue = parseInt(window.resizeValue.value, 10);
    window.createScale(window.resizeValue, 25, currentValue);
  });
})();
