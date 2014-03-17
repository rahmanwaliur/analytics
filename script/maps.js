var show_map = function(kmlUrl, community_id) {
  var calgary = new google.maps.LatLng(51.0500,-114.0667);
  var mapOptions = {
    zoom: 11,
    center: calgary
  }

  var map = new google.maps.Map(document.getElementById('map-canvas-' + community_id), mapOptions);

  var ctaLayer = new google.maps.KmlLayer({
    url: kmlUrl
  });
  ctaLayer.setMap(map);
};