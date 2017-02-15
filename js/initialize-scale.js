'use strict';

// масштабирование
window.createScale = (function () {

  return function (element, step, currentValue, callback) {
    currentValue += step;
    if (currentValue >= 25 && currentValue <= 100) {
      element.value = currentValue + '%';
      element.setAttribute('value', element.value);
      var scaleNumber = currentValue / 100;

      if (typeof callback === 'function') {
        callback(scaleNumber);
      }
    }
  };
})();
