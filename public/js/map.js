    const coordinates=window.coordinates;
    console.log(coordinates);
    
    mapboxgl.accessToken=mapToken;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: coordinates , // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 13 // starting zoom
    });
    new mapboxgl.Marker()
    .setLngLat(coordinates)
    .addTo(map);

