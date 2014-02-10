var show_map = function() {
  var calgary = new google.maps.LatLng(51.0500,-114.0667);
  var mapOptions = {
    zoom: 11,
    center: calgary
  }

  var map = new google.maps.Map(document.getElementById('map-canvas-1'), mapOptions);

  var ctaLayer = new google.maps.KmlLayer({
    // url: 'http://gmaps-samples.googlecode.com/svn/trunk/ggeoxml/cta.kml'
    url: 'https://raw2.github.com/smsohan/analytics/master/data/sample.kml'
  });
  ctaLayer.setMap(map);
};