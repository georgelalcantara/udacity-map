import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {

state = {
  places: []
}

componentDidMount(){
  this.getPlaces()
}

renderMap = () => {
  loadMap("https://maps.googleapis.com/maps/api/js?key=AIzaSyBpD3XZpiUMncwPAGIBjKbiPruAWZ6ByyU&callback=initMap")
  window.initMap = this.initMap
}

getPlaces = () => {
  const endPoint = "https://api.foursquare.com/v2/venues/explore?"
  const parameters = {
    client_id: "DSAC3YF0G3M55SCXFD3TXIJ3OVVK352TIMASJAEKJPKOSIU1",
    client_secret: "OFXLLGLJ44RTNIN4XCD2COO05LML0YL3E0OWF1I4RNNL21TF",
    query: "coffee",
    near: "Bogota",
    v: "20182212"
  }
axios.get(endPoint + new URLSearchParams(parameters))
.then(response => {
  this.setState({
    places: response.data.response.groups[0].items
  }, this.renderMap()
)
})
.catch(error => {
  console.log("Error: " + error)
})

}

   initMap = () => {
        var map = new window.google.maps.Map(document.getElementById('map'), {
           center: {lat: 4.674285, lng: -74.056567},
           zoom: 12
         });

         var infowindow = new window.google.maps.InfoWindow();

this.state.places.map(myPlaces => {

  var contentString = `${myPlaces.venue.name}`

  var marker = new window.google.maps.Marker({
position: {lat: myPlaces.venue.location.lat, lng: myPlaces.venue.location.lng},
map: map,
title: myPlaces.venue.name
});

marker.addListener('click', function() {
    infowindow.setContent(contentString);
    infowindow.open(map, marker);
  });

});
       }


  render() {
    return (
      <main>
       <div id="map"></div>
      </main>
    )
  }
}

/*</script>
    <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
    async defer></script>
*/

function loadMap(url){
    var index = window.document.getElementsByTagName('script')[0]
    var script = window.document.createElement('script')
    script.src = url
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
}


export default App;
