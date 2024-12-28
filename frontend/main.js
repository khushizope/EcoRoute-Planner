mapboxgl.accessToken = 'your_mapbox_access_token';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-74.5, 40],
  zoom: 9
});

// Function to calculate and display eco-friendly route
async function calculateRoute(start, end) {
  const response = await fetch('http://localhost:3000/api/route', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ start, end })
  });

  const data = await response.json();
  const route = JSON.parse(data.route);

  map.addLayer({
    id: 'ecoRoute',
    type: 'line',
    source: {
      type: 'geojson',
      data: route
    },
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': '#00FF00',
      'line-width': 4
    }
  });
}
