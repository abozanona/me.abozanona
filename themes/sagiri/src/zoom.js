const zoom = require('zoom-image');

function zoomContent () {
  Array.prototype.forEach.call($('.content img').not('[hidden]').not('.no-popup-img').not('.post-share img').not('.map-marker-img'), el => {
    zoom(el);
  });
}

module.exports = zoomContent;
