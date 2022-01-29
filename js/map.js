var coordinates ={ lat: 12.987606639702959,lng: 79.97192584601231};
var options = {
    center:coordinates,
    zoom:16,
    mapTypeId:google.maps.MapTypeId.ROADMAP
};
var map = new google.maps.Map(document.getElementById("map"),options);

// mapboxgl.accessToken = 'pk.eyJ1IjoibWlrZWphY2tpZWNoYW4iLCJhIjoiY2t5eWNxYjQ3MHI2ZzJubXg0N2I5eGRodSJ9.XDcyBDKCqRgsepX1U_RghA';
// setUpMap([79.97192584601231,12.987606639702959])
// function setUpMap(center){
//     var map = new mapboxgl.Map({
//         container: 'map',
//         style: 'mapbox://styles/mapbox/streets-v11',
//         center : center,
//         zoom:15
//     });
//     var nav = new mapboxgl.NavigationControl()
// map.addControl(nav,'bottom-right')
// var directions = new MapboxDirections({
//     accessToken: 'YOUR-MAPBOX-ACCESS-TOKEN',
//     unit: 'metric',
//     profile: 'mapbox/walking'
//   });
//   map.addControl(directions, 'top-left');
// }

var dirService = new google.maps.DirectionsService();

var dirDisplay = new google.maps.DirectionsRenderer();

dirDisplay.setMap(map);

function CalculateRoute()
{
    var req = {
        origin:document.getElementById("from").value,
        destination:document.getElementById("to").value,
        travelMode:google.maps.TravelMode.WALKING,
        unitSystem:google.maps.UnitSystem.IMPERIAL
    }

    dirService.route(req,(result,status)=>{
        if(status==google.maps.DirectionsStatus.OK)
        {
            const op=document.querySelector("#op");
            op.innerHTML="<div class='info'> From : &nbsp&nbsp&nbsp&nbsp&nbsp"+ document.getElementById("from").value+"&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp To : &nbsp&nbsp&nbsp&nbsp&nbsp"+document.getElementById("to").value+"<br/> Walking Distance : &nbsp&nbsp&nbsp&nbsp&nbsp"+ result.routes[0].legs[0].distance.text + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspDuration : &nbsp&nbsp&nbsp&nbsp&nbsp"+ result.routes[0].legs[0].duration.text+"</div>";

            dirDisplay.setDirections(result);

        }
        else
        {
            dirDisplay.setDirections({routes:[]});
            map.setCenter(coordinates);
            op.innerHTML="<br/> <div class='error'> Error ! </div>";

        }
    });
}