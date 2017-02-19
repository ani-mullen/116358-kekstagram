'use strict';

window.pictures = (function () {

  var DATA_URL = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
  var pictureBox = document.querySelector('.pictures');

  return function () {

    window.load(DATA_URL, onload);

    function onload(data) {
      pictureBox.innerHTML = '';
      var pictures = data.target.response;
      for (var i = 0; i < pictures.length; i++) {
        renderingPost(pictures[i]);
      }
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
