'use strict';

// Функция изменения значения Aria роли
window.ariaRole = (function () {
  return {
    ariaRoleToggle: function (item, valueAttribute) {
      var booleanValue = (item.getAttribute('valueAttribute') === 'true');
      item.setAttribute(valueAttribute, !booleanValue);
    },
    ariaCheckedFalse: function (param) {
      var ariaRoleFilters = document.querySelectorAll(param);
      for (var i = ariaRoleFilters.length; i--;) {
        ariaRoleFilters[i].setAttribute('aria-checked', false);
      }
    }
  };
})();
