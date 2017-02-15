'use strict';
// Функция переключения фильтров
window.initializeFilters = (function () {

  // обнуление aria-checked у всех фильтров
  var ariaCheckedFalse = function () {
    var ariaRoleFilter = document.querySelectorAll('.upload-filter-preview');
    for (var i = ariaRoleFilter.length; i--;) {
      ariaRoleFilter[i].setAttribute('aria-checked', false);
    }
  };

  return {
    toggleFilter: function (evt, callback) {
      var element = evt.target.parentNode;
      var elementTagName = element.tagName;
      if ((window.assist.isClickEvent(evt) || window.assist.isActivationEvent(evt)) && (elementTagName === 'LABEL')) {
        ariaCheckedFalse(); // обнуление aria-checked
        window.ariaRoleToggle(evt.target, 'aria-checked'); // переключение aria-checked у фильтров
        var nameFilter = document.getElementById(element.htmlFor).value;
        document.querySelector('#upload-filter-' + nameFilter).click(); // подсветка выбранного фильтра при нажатии на клавишу
        if (typeof callback === 'function') {
          callback(nameFilter);
        }
      }
    },
    ariaRoleFilterCheckedFalse: ariaCheckedFalse,
    ariaRoleFilterNoneTrue: function (evt) { // возвращение aria-checked = true первому выбранному фильтру
      var ariaRoleNone = document.querySelector('.upload-filter-preview');
      ariaRoleNone.setAttribute('aria-checked', true);
    }
  };

})();
