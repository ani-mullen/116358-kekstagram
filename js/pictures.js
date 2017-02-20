'use strict';

window.pictures = (function () {

  var DATA_URL = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
  var pictureBox = document.querySelector('.pictures');
  var filters = document.querySelector('.filters');

  return function () {

    window.load(DATA_URL, onload);

    function onload(data) {
      var pictures = data.target.response;
      function inizialeArray() {
        pictureBox.innerHTML = '';
        for (var i = 0; i < pictures.length; i++) {
          renderingPost(pictures[i]);
        }
      }
      inizialeArray();

      function filterClickHandler(evt) {
        var newElement = evt.target;
        var elementTagName = newElement.tagName;
        if ((window.assist.isClickEvent(evt) || window.assist.isActivationEvent(evt)) && (elementTagName === 'LABEL')) {
          var nameFilter = document.getElementById(newElement.htmlFor).value;
          window.ariaRole.ariaCheckedFalse('.filters-item');
          window.ariaRole.ariaRoleToggle(newElement, 'aria-checked');
          document.querySelector('#filter-' + nameFilter).click();
        }
        switch (nameFilter) {
          case 'popular':
            inizialeArray();
            break;

          case 'new':
            pictureBox.innerHTML = '';
            var picturesRandom = pictures.map(function (image) {
              return image;
            });
            var shuffle = function (array) {
              var count = array.length;
              while (count > 0) {
                var i = Math.floor(Math.random() * count);
                count--;
                var temp = array[count];
                array[count] = array[i];
                array[i] = temp;
              }
              return array;
            };
            shuffle(picturesRandom);
            for (var i = 0; i < 10; i++) {
              renderingPost(picturesRandom[i]);
            }
            break;

          case 'discussed':
            pictureBox.innerHTML = '';
            var picturesSort = pictures.map(function (picture) {
              return picture;
            }).sort(function (a, b) {
              return b.comments.length - a.comments.length;
            });
            for (i = 0; i < picturesSort.length; i++) {
              renderingPost(picturesSort[i]);
            }
            break;
        }
      }

      function filterChange(evt) {
        filterClickHandler(evt);
      }

      filters.addEventListener('click', filterChange);
      filters.addEventListener('keydown', filterChange);

      filters.classList.remove('hidden');
    }

    function renderingPost(picture) {
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

      return pictureBox.appendChild(pictureElement);
    }
  };

})();
