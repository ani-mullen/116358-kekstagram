'use strict';

// Функция изменения значения Aria роли
window.ariaRoleToggle = (function () {
  return function (item, valueAttribute) {
    var booleanValue = (item.getAttribute('valueAttribute') === 'true');
    item.setAttribute(valueAttribute, !booleanValue);
  };
})();