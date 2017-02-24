'use strict';

// масштабирование
window.createScale = (function () {

  return function (element, callback) {

    var resizeValue = element.children[1];
    var resizeDec = element.children[0];
    var resizeInc = element.children[2];

    function setImageSize(currentNumber) {
      resizeValue.value = currentNumber + '%';
      resizeValue.setAttribute('value', resizeValue.value);

      var scaleNumber = currentNumber / 100;

      if (typeof callback === 'function') {
        callback(scaleNumber);
      }
    }

    setImageSize(100);
    var currentNumber = parseInt(resizeValue.value, 10);

    function resizeImageValue(step) {
      currentNumber += step;
      if (currentNumber >= 25 && currentNumber <= 100) {
        setImageSize(currentNumber);
      }
    }

    function decreaseSize() {
      resizeImageValue(-25);
    }
    function increaseSize() {
      resizeImageValue(25);
    }

    resizeDec.addEventListener('click', decreaseSize);
    resizeInc.addEventListener('click', increaseSize);

    return function () {
      resizeDec.removeEventListener('click', decreaseSize);
      resizeInc.removeEventListener('click', increaseSize);
    };
  };

})();
