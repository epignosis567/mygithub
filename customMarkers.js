var myNewMap;

//setup google maps
function initMap() {

    //fill the div with a map
    myNewMap = new google.maps.Map(document.getElementById('mymap'), {
        zoom: 12,
        mapTypeId: 'satellite',
        labels: true,
        streetViewControl: false,
        center: {lat: 40.7498024, lng: -73.9774375},
        mapTypeControlOptions: {      
          mapTypeIds: [
            google.maps.MapTypeId.ROADMAP,
            google.maps.MapTypeId.SATELLITE //HYBRID would show labels
          ]
        }
    });
    
    myNewMap.data.loadGeoJson('customMarkers.geojson');

    var infowindow = new google.maps.InfoWindow({maxWidth:750,});
    myNewMap.data.addListener('click', function(event) {
        console.log(event);
        // set variables
        let title = event.feature.getProperty('title');
        let videourl = event.feature.getProperty('videoURL');
        //let html = '<video style="padding-bottom: 5px; padding-right: 3px;" preload="none" autoplay width="90%"><source src="' + videourl + '"></video>'; //padding/margin is wonky on mobile vs desktop
        // show the html variable in the infowindow
        //infowindow.setContent(html); 
        infowindow.setPosition(event.latLng);
        infowindow.setOptions({pixelOffset: new google.maps.Size(0, -42)}); 
        // move the infowindow up 42 pixels to the top of the default marker icon
        infowindow.open(myNewMap);
    });


//icon repository
    const iconBase = "https://developers.google.com/maps/documentation/javascript/examples/full/images/";
    const icons = {
            parking: {
                  icon: iconBase + "parking_lot_maps.png",
                },
                library: {
                  icon: iconBase + "library_maps.png",
                },
                info: {
                  icon: iconBase + "info-i_maps.png",
                },
            };
    
  // Create markers.
  for (let i = 0; i < features.length; i++) {
    const marker = new google.maps.Marker({
      position: features[i].position,
      icon: icons[features[i].type].icon,
      map: map,
    });
  }
 
    
}


