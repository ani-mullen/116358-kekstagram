'use strict';

window.showGallery = (function () {
  return function (picture) {
    var galleryOverlay = document.querySelector('.gallery-overlay');
    var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');

    var onKeyDownEsc = function (evt) {
      if (window.assist.isDeactivationEvent(evt)) {
        galleryOverlay.classList.add('invisible');
      }
    };

    galleryOverlay.classList.remove('invisible');
    window.addEventListener('keydown', onKeyDownEsc);
    galleryOverlayClose.setAttribute('aria-pressed', false);
    galleryOverlay.querySelector('.gallery-overlay-image').setAttribute('src', picture.url);
    galleryOverlay.querySelector('.likes-count').textContent = picture.likes;
    galleryOverlay.querySelector('.comments-count').textContent = picture.comments.length;


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
    };
  };
})();
