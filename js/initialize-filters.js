'use strict';
// Функция переключения фильтров
window.initializeFilters = (function () {

  return function (element, callback) {

    document.querySelector('#upload-filter-none').click(); // подстветка первого фильтра

    function filterClickHandler(evt) {
      var newElement = evt.target.parentNode;
      var elementTagName = newElement.tagName;
      if ((window.assist.isClickEvent(evt) || window.assist.isActivationEvent(evt)) && (elementTagName === 'LABEL')) {
        var nameFilter = document.getElementById(newElement.htmlFor).value;
        ariaCheckedFalse(); // обнуление aria-checked
        window.ariaRoleToggle(evt.target, 'aria-checked'); // переключение aria-checked
        document.querySelector('#upload-filter-' + nameFilter).click(); // подсветка выбранного фильтра

        if (typeof callback === 'function') {
          callback(nameFilter);
        }
      }
    }

    // очистка aria-checked
    var ariaCheckedFalse = function () {
      var ariaRoleFilter = document.querySelectorAll('.upload-filter-preview');
      for (var i = ariaRoleFilter.length; i--;) {
        ariaRoleFilter[i].setAttribute('aria-checked', false);
      }
    };

    // возвращение aria-checked = true первому выбранному фильтру
    var ariaRoleFilterNoneTrue = function () {
      var ariaRoleNone = document.querySelector('.upload-filter-preview');
      ariaRoleNone.setAttribute('aria-checked', true);
    };

    ariaRoleFilterNoneTrue();

    element.addEventListener('click', function (evt) {
      filterClickHandler(evt);
    });

    element.addEventListener('keydown', function (evt) {
      filterClickHandler(evt);
    });

  };

})();
