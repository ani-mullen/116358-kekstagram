'use strict';
// Функция переключения фильтров
window.initializeFilters = (function () {

  // обнуление aria-checked
  var ariaCheckedFalse = function () {
    var ariaRoleFilter = document.querySelectorAll('.upload-filter-preview');
    for (var i = ariaRoleFilter.length; i--;) {
      ariaRoleFilter[i].setAttribute('aria-checked', false);
    }
  };

  return {
    toggleFilter: function (evt) {
      var element = evt.target.parentNode;
      var elementTagName = element.tagName;
      if ((window.isClickEvent(evt) || window.isActivateEvent(evt)) && (elementTagName === 'LABEL')) {
        var nameFilter = document.getElementById(element.htmlFor).value;
        window.imagePreview.className = 'filter-image-preview';
        window.imagePreview.classList.add('filter-' + nameFilter);
        ariaCheckedFalse();
        window.ariaRoleToggle(evt.target, 'aria-checked');
      }
    },
    ariaRoleFilterCheckedFalse: ariaCheckedFalse,
    ariaRoleFilterNoneTrue: function (evt) {
      var ariaRoleNone = document.querySelector('.upload-filter-preview');
      ariaRoleNone.setAttribute('aria-checked', true);
    }
  };

})();
