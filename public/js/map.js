document.addEventListener('DOMContentLoaded', function() {
  // Get the map container element
  const mapElement = document.getElementById('map');

  if (mapElement) {
    // Parse the locations data stored in the data attribute of the map container
    let locations = [];
    try {
      locations = JSON.parse(mapElement.dataset.locations || '[]');
    } catch (err) {
      console.error("Error parsing locations data:", err);
    }

    // Ensure Leaflet library is loaded
    if (typeof L === 'undefined') {
      console.error("Leaflet library not loaded.");
      return;
    }

    // Initialize the map (Leaflet)
    const map = L.map('map', { zoomControl: false });

    // Add a tile layer (OpenStreetMap by default)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Custom icon for markers
    const customIcon = L.icon({
      iconUrl: '/img/pin.png', // Replace with your custom icon URL
      iconSize: [30, 40], // Size of the icon [width, height]
      iconAnchor: [15, 40], // Anchor point of the icon (center bottom)
    });

    // Array to hold all marker points for setting map bounds
    const points = [];

    // Add markers and popups based on locations data
    locations.forEach((loc) => {
      if (loc.coordinates && loc.coordinates.length === 2) {
        const [lng, lat] = loc.coordinates;
        points.push([lat, lng]);

        // Add marker with custom icon and bind popup
        L.marker([lat, lng], { icon: customIcon })
          .addTo(map)
          .bindPopup(
            `<p>Day ${loc.day || 'N/A'}: ${loc.description || 'No description available'}</p>`,
            { autoClose: false }
          );
      } else {
        console.warn("Invalid coordinates for location:", loc);
      }
    });

    // If there are valid points, fit the map bounds to those points
    if (points.length > 0) {
      const bounds = L.latLngBounds(points).pad(0.5);
      map.fitBounds(bounds);
    }

    // Disable scroll wheel zoom
    map.scrollWheelZoom.disable();

    // Mark the map as initialized to prevent re-initialization
    mapElement._initialized = true;
  } else {
    console.error("Map container not found.");
  }
});
