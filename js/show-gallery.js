'use strict';

window.showGallery = (function () {
  return function (picture) {
    var galleryOverlay = document.querySelector('.gallery-overlay');
    var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');
    var galleryOverlayImage = galleryOverlay.querySelector('.gallery-overlay-image');
    var galleryOverlayLikes = galleryOverlay.querySelector('.likes-count');
    var galleryOverlayComments = galleryOverlay.querySelector('.comments-count');

    function onKeyDownEsc(evt) {
      if (window.assist.isDeactivationEvent(evt)) {
        galleryOverlay.classList.add('invisible');
      }
    }

    function showPicture() {
      galleryOverlay.classList.remove('invisible');
      window.addEventListener('keydown', onKeyDownEsc);
      galleryOverlayClose.setAttribute('aria-pressed', false);
      galleryOverlayImage.setAttribute('src', picture.url);
      galleryOverlayLikes.textContent = picture.likes;
      galleryOverlayComments.textContent = picture.comments.length;
    }

    showPicture();

    var hideGalleryOverlay = function () {
      galleryOverlay.classList.add('invisible');
      window.ariaRole.ariaRoleToggle(galleryOverlayClose, 'aria-pressed');
      window.removeEventListener('keydown', onKeyDownEsc);
    };

    galleryOverlayClose.addEventListener('click', function () {
      hideGalleryOverlay();
    });

    galleryOverlayClose.addEventListener('keydown', function (evt) {
      if (window.assist.isActivationEvent(evt)) {
        hideGalleryOverlay();
      }
    });
    return function () {
      window.ariaRole.ariaRoleToggle(galleryOverlayClose, 'aria-pressed');
      window.removeEventListener('keydown', onKeyDownEsc);
    };
  };
})();
