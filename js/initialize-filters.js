'use strict';
// Функция переключения фильтров
window.initializeFilters = function (evt) {
  var element = evt.target.parentNode;
  var elementTagName = element.tagName;
  if ((window.isClickEvent(evt) || window.isActivateEvent(evt)) && (elementTagName === 'LABEL')) {
    var nameFilter = document.getElementById(element.htmlFor).value;
    window.imagePreview.className = 'filter-image-preview';
    window.imagePreview.classList.add('filter-' + nameFilter);
    ariaCheckedFalse();
    window.ariaRoleToggle(evt.target, 'aria-checked');
  }
  // обнуление aria-checked
  function ariaCheckedFalse() {
    var first = document.querySelectorAll('.upload-filter-preview');
    for (var i = 0; i < first.length; i++) {
      first[i].setAttribute('aria-checked', false);
    }
  }
};
