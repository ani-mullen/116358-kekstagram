'use strict';

window.pictures = (function () {

  var DATA_URL = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
  var pictureBox = document.querySelector('.pictures');
  var filters = document.querySelector('.filters');

  return function () {

    window.load(DATA_URL, onload);

    function onload(data) {
      var pictures = data.target.response;
      pictureBox.append(pictures.map(renderingPost).reduce(addPictureToDocumentFragment, document.createDocumentFragment()));

      function filterChange(evt) {
        var nameFilter = evt.target;
        var elementTagName = nameFilter.tagName;
        if ((window.assist.isClickEvent(evt) || window.assist.isActivationEvent(evt)) && (elementTagName === 'LABEL')) {
          window.ariaRole.ariaCheckedFalse('.filters-item');
          window.ariaRole.ariaRoleToggle(nameFilter, 'aria-checked');
          document.querySelector('#filter-' + document.getElementById(nameFilter.htmlFor).value).click();
          switch (evt.target.htmlFor) {
            case 'filter-popular':
              pictureBox.append(pictures.filter(filter).map(renderingPost).reduce(addPictureToDocumentFragment, document.createDocumentFragment()));
              break;

            case 'filter-new':
              pictureBox.append(pictures.filter(filter).sort(function () {
                return Math.random() - 0.5;
              }).slice(0, 10).map(renderingPost).reduce(addPictureToDocumentFragment, document.createDocumentFragment()));
              break;

            case 'filter-discussed':
              pictureBox.append(pictures.filter(filter).sort(function (a, b) {
                return b.comments.length - a.comments.length;
              }).map(renderingPost).reduce(addPictureToDocumentFragment, document.createDocumentFragment()));
              break;
          }
        }
      }

      function filterClickHandler(evt) {
        filterChange(evt);
      }

      filters.addEventListener('click', filterClickHandler);
      filters.addEventListener('keydown', filterClickHandler);

      filters.classList.remove('hidden');
    }

    function renderingPost(picture) {
      pictureBox.innerHTML = '';
      var pictureTemplate = document.querySelector('#picture-template');
      var pictureToClone = pictureTemplate.content.querySelector('.picture');
      var pictureElement = pictureToClone.cloneNode(true);

      pictureElement.tabIndex = '1';
      pictureElement.querySelector('img').src = picture.url;
      pictureElement.querySelector('.picture-likes').textContent = picture.likes;
      pictureElement.querySelector('.picture-comments').textContent = picture.comments.length;


      function pictureClickHandler(evt) {
        evt.preventDefault();
        window.showGallery(picture);
      }

      pictureElement.addEventListener('click', function (evt) {
        pictureClickHandler(evt);
      });

      pictureElement.addEventListener('keydown', function (evt) {
        if (window.assist.isActivationEvent(evt)) {
          pictureClickHandler(evt);
        }
      });

      return pictureElement;
    }

    function addPictureToDocumentFragment(result, element) {
      result.append(element);
      return result;
    }

    function filter() {
      return true;
    }
  };

})();
