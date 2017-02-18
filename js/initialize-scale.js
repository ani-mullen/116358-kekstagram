'use strict';

// масштабирование
window.createScale = (function () {

  return function (element, callback) {

    var resizeValue = element.children[1];
    var resizeInc = element.children[0];
    var resizeDec = element.children[2];

    function setImageSize(currentNumber) {
      resizeValue.value = currentNumber + '%';
      resizeValue.setAttribute('value', resizeValue.value);

      var scaleNumber = currentNumber / 100;

      if (typeof callback === 'function') {
        callback(scaleNumber);
      }
    }
    setImageSize(100);

    function resizeImageValue(step) {
      var currentNumber = parseInt(resizeValue.value, 10);
      if (currentNumber >= 25 || currentNumber <= 100) {
        currentNumber += step;
      }
      setImageSize(currentNumber);
    }

    resizeInc.addEventListener('click', function () {
      resizeImageValue(-25);
    });

    resizeDec.addEventListener('click', function () {
      resizeImageValue(25);
    });
  };
})();

