var myCenter = new google.maps.LatLng(51.521335, -0.157326);

function initialize() {
  var mapProp = {
    center: myCenter,
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: false
  };
  var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
  //Cria um Marker
  var marker = new google.maps.Marker( {
    position: myCenter,
    icon: "assets/img/marker.png",
    animation: google.maps.Animation.DROP
  });
  //Adiciona o Marker criado
  marker.setMap(map);
}
google.maps.event.addDomListener(window, 'load', initialize);
