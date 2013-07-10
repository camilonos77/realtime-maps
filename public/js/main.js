$(document).ready(function(){
    // Ins. s-io on client
    var socket = io.connect(window.location.href),
    // Initialize map
        map = L.map('map', {
                               center: [ 25.790, -80.336 ],
                               zoom: 16 
                           }
              ),

    // Everything in Leaflet is a tile
    // Satelite-like tile
        tiles = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

    // Monochromatic tile
    //var tiles = L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png');
    
    // Adding tile to map
    map.addLayer(tiles);
    
    // Attemp to geolocate user
    // Not always good for it requires higher load time
    // and permission from user
    map.locate({
        enableHighAccuracy: true
    });
    
    // Location acquired !
    map.on('locationfound', onLocationFound);
    function onLocationFound(pos){
        //console.log(pos);
        console.log('Your location is lat: '+pos.latlng.lat+' and lng: '+pos.latlng.lng);

        var marker = L.marker([ pos.latlng.lat, pos.latlng.lng ]);
        map.addLayer(marker);
        marker.bindPopup("You are HERE!").openPopup();

        // Send location to server 
        socket.emit('myLoc', { latlng: pos.latlng });

    }
    
    // Error while attemping GeoLoc
    map.on('locationerror', onLocationError);
    function onLocationError(err){
        console.log(err);
        //console.log('Error!\nCode:'+err.code+'\nMsg: '+err.message);
    }

    socket.on('usrsLoc', function(data){
        var usrsMarker = L.marker([ data.latlng.lat, data.latlng.lng ]);
        map.addLayer(usrsMarker);
    });
});
