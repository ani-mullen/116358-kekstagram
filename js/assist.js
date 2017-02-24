'use strict';

// Функция определения ENTER_KEY_CODE
window.assist = (function () {
  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;

  function isKeyboardEvent(evt) {
    return typeof evt.keyCode !== 'undefined';
  }
  return {
    isClickEvent: function (evt) {
      return evt.type === 'click';
    },
    isActivationEvent: function (evt) {
      return isKeyboardEvent(evt) && evt.keyCode === ENTER_KEY_CODE;
    },
    isDeactivationEvent: function (evt) {
      return isKeyboardEvent(evt) && evt.keyCode === ESCAPE_KEY_CODE;
    },
    isKeyboardEvent: isKeyboardEvent
  };

})();
