'use strict';

// Функция изменения значения Aria роли
window.ariaRole = (function () {
  return {
    ariaRoleToggle: function (item, valueAttribute) {
      var booleanValue = (item.getAttribute('valueAttribute') === 'true');
      item.setAttribute(valueAttribute, !booleanValue);
    },
    ariaCheckedFalse: function (param) {
      var ariaRoleFilter = document.querySelectorAll(param);
      for (var i = ariaRoleFilter.length; i--;) {
        ariaRoleFilter[i].setAttribute('aria-checked', false);
      }
    }
  };
})();
