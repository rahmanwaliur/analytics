var show_map = function(community, community_id) {
  var community_code = window.kml_data['community'];

  var calgary = new google.maps.LatLng(51.0500,-114.0667);
  var mapOptions = {
    zoom: 11,
    center: calgary
  }

  var map = new google.maps.Map(document.getElementById('map-canvas-' + community_id), mapOptions);

  var ctaLayer = new google.maps.KmlLayer({
    url: 'http://smsohan.com/analytics/data/' + community_code + ".kml";
  });
  ctaLayer.setMap(map);
};