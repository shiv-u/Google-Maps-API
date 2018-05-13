(function() {

var map, geocoder, marker, infowindow;
window.onload = function() {

var options = {
zoom: 3,
center: new google.maps.LatLng(39.9312873,-105.16312470000003),
mapTypeId: google.maps.MapTypeId.ROADMAP
};
map = new google.maps.Map(document.getElementById('map'), options);
	var sin=new google.maps.Marker({
		map:map,
		title:"sindupramu's house",
		position:new google.maps.LatLng(39.9312873,-105.16312470000003)
			});
	var content='<div id="info">'+
'<img src="img/sindpramu.png" alt="" />'+
"<h1>sindhupramu's house</h1>"+"</br>"+
'</div>';
	google.maps.event.addListener(sin,'click',function(){
		if(!infowindow){
			var infowindow=new google.maps.InfoWindow();
		}
		infowindow.setContent(content);
		infowindow.open(map,sin);
		
	});
	google.maps.event.addListener(sin,'click',function()
	{
		map.setOptions({
		zoom:18,
		mapTypeId:google.maps.MapTypeId.SATELLITE
		});
		
	});

var form = document.getElementById('addressForm');

form.onsubmit = function() {

var address = document.getElementById('address').value;

getCoordinates(address);

return false;
}
}

function getCoordinates(address) {

if(!geocoder) {
geocoder = new google.maps.Geocoder(); 
}

var geocoderRequest = {
address: address
}

geocoder.geocode(geocoderRequest, function(results, status) {

if (status == google.maps.GeocoderStatus.OK) {

map.setCenter(results[0].geometry.location);

if (!marker) {

marker = new google.maps.Marker({
map: map
});
}

marker.setPosition(results[0].geometry.location);

google.maps.event.addListener(marker,'click',function(){
	
	map.setOptions({
		zoom:18
	});
	
	
});

if (!infowindow) {

infowindow = new google.maps.InfoWindow();
}

var content = '<strong>' + results[0].formatted_address + '</strong><br />';
content += 'Lat: ' + results[0].geometry.location.lat() + '<br />';
content += 'Lng: ' + results[0].geometry.location.lng();

infowindow.setContent(content);

infowindow.open(map, marker);
}
});
}
})();