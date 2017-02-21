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
        pictures.forEach(renderingPost);
      }
      inizialeArray();

      function filterClickHandler(evt, callback) {
        var newElement = evt.target;
        var elementTagName = newElement.tagName;
        if ((window.assist.isClickEvent(evt) || window.assist.isActivationEvent(evt)) && (elementTagName === 'LABEL')) {
          var nameFilter = document.getElementById(newElement.htmlFor).value;
          window.ariaRole.ariaCheckedFalse('.filters-item');
          window.ariaRole.ariaRoleToggle(newElement, 'aria-checked');
          document.querySelector('#filter-' + nameFilter).click();
          pictureBox.innerHTML = '';
        }
        if (typeof callback === 'function') {
          callback(nameFilter);
        }
      }

      var changePostArray = function (nameFilter) {
        switch (nameFilter) {
          case 'popular':
            inizialeArray();
            break;

          case 'new':
            shuffleArray(pictures);
            break;

          case 'discussed':
            var picturesSort = [].concat(pictures).sort(function (a, b) {
              return b.comments.length - a.comments.length;
            });
            picturesSort.forEach(renderingPost);
            break;
        }
      };

      function filterChange(evt) {
        filterClickHandler(evt, changePostArray);
      }

      filters.addEventListener('click', filterChange);
      filters.addEventListener('keydown', filterChange);

      filters.classList.remove('hidden');
    }
    var shuffleArray = function (array) {
      var picturesRandom = [].concat(array);
      var count = array.length;
      while (count > 0) {
        var i = Math.floor(Math.random() * count);
        count--;
        var temp = array[count];
        array[count] = picturesRandom[i];
        picturesRandom[i] = temp;
      }
      return picturesRandom.slice(0, 10).forEach(renderingPost);
    };

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
