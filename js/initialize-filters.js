'use strict';
// Функция переключения фильтров
window.initializeFilters = (function () {

  return function (element, callback) {

    document.querySelector('#upload-filter-none').checked = true;

    function filterChange(evt) {
      var newElement = evt.target.parentNode;
      var elementTagName = newElement.tagName;
      if ((window.assist.isClickEvent(evt) || window.assist.isActivationEvent(evt)) && (elementTagName === 'LABEL')) {
        var nameFilter = document.getElementById(newElement.htmlFor).value;
        window.ariaRole.ariaCheckedFalse('.upload-filter-preview'); // обнуление aria-checked
        window.ariaRole.ariaRoleToggle(evt.target, 'aria-checked'); // переключение aria-checked
        document.querySelector('#upload-filter-' + nameFilter).checked = true; // подсветка выбранного фильтра

        if (typeof callback === 'function') {
          callback(nameFilter);
        }
      }
    }

    // возвращение aria-checked = true первому выбранному фильтру
    function ariaRoleFilterNoneTrue() {
      var ariaRoleNone = document.querySelector('.upload-filter-preview');
      ariaRoleNone.setAttribute('aria-checked', true);
    }

    function filterClickHandler(evt) {
      filterChange(evt);
    }

    element.addEventListener('click', filterClickHandler);
    element.addEventListener('keydown', filterClickHandler);

    return function () {
      window.ariaRole.ariaCheckedFalse('.upload-filter-preview');
      ariaRoleFilterNoneTrue();
      if (typeof callback === 'function') {
        callback('none');
      }
      element.addEventListener('click', filterClickHandler);
      element.addEventListener('keydown', filterClickHandler);
    };

  };

})();
