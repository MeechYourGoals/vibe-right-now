
import mapboxgl from 'mapbox-gl';
import { Location } from "@/types";
import { calculateDistance } from '../common/DistanceCalculator';

interface CreateMarkerOptions {
  location: Location;
  map: mapboxgl.Map;
  index: number;
  onLocationSelect: (location: Location) => void;
  showDistances: boolean;
  referencePoint: { lat: number; lng: number } | null;
}

/**
 * Create and configure a Mapbox marker for a location
 */
export const createLocationMarker = ({
  location,
  map,
  index,
  onLocationSelect,
  showDistances,
  referencePoint
}: CreateMarkerOptions): mapboxgl.Marker => {
  // Create container for marker and labels
  const container = document.createElement('div');
  container.className = 'location-marker-container';
  
  // Create marker element
  const el = document.createElement('div');
  el.className = 'location-marker';
  el.style.width = '20px';
  el.style.height = '20px';
  el.style.borderRadius = '50%';
  el.style.backgroundColor = 'rgba(var(--primary), 0.9)';
  el.style.border = '2px solid white';
  el.style.cursor = 'pointer';
  container.appendChild(el);
  
  // Create a pulse effect element
  const pulse = document.createElement('div');
  pulse.className = 'location-marker-pulse';
  pulse.style.position = 'absolute';
  pulse.style.width = '30px';
  pulse.style.height = '30px';
  pulse.style.borderRadius = '50%';
  pulse.style.backgroundColor = 'rgba(var(--primary), 0.2)';
  pulse.style.border = '1px solid rgba(var(--primary), 0.3)';
  pulse.style.transform = 'translate(-5px, -5px)';
  pulse.style.animation = 'pulse 2s infinite';
  pulse.style.animationDelay = `${index * 0.1}s`;
  el.appendChild(pulse);
  
  // Add venue name above marker if showDistances is enabled
  if (showDistances) {
    const nameLabel = document.createElement('div');
    nameLabel.className = 'location-marker-name';
    nameLabel.textContent = location.name;
    container.appendChild(nameLabel);
  }
  
  // Add distance label below marker if showDistances is enabled and we have a reference point
  if (showDistances && referencePoint) {
    const distanceLabel = document.createElement('div');
    distanceLabel.className = 'location-marker-label';
    const distance = calculateDistance(
      referencePoint.lat, 
      referencePoint.lng, 
      location.lat, 
      location.lng
    );
    distanceLabel.textContent = `${distance} Away`;
    container.appendChild(distanceLabel);
  }
  
  // Create and add marker
  const marker = new mapboxgl.Marker(container)
    .setLngLat([location.lng, location.lat])
    .addTo(map);
  
  // Add popup on hover
  const popup = new mapboxgl.Popup({ 
    offset: 25, 
    closeButton: false, 
    closeOnClick: false 
  }).setHTML(`
    <div style="padding: 8px;">
      <div style="font-weight: bold;">${location.name}</div>
      <div style="font-size: 12px; color: #666;">${location.type} in ${location.city}</div>
    </div>
  `);
  
  // Show popup on hover
  el.addEventListener('mouseenter', () => {
    marker.setPopup(popup);
    popup.addTo(map);
  });
  
  // Hide popup on leave
  el.addEventListener('mouseleave', () => {
    popup.remove();
  });
  
  // Handle click on marker
  el.addEventListener('click', () => {
    onLocationSelect(location);
    
    // Fly to location
    map.flyTo({
      center: [location.lng, location.lat],
      zoom: 15,
      speed: 1.2,
      curve: 1,
      essential: true
    });
  });
  
  return marker;
};

/**
 * Create a user location marker
 */
export const createUserMarker = (
  coordinates: [number, number], 
  map: mapboxgl.Map, 
  color: string = '#FF9900'
): mapboxgl.Marker => {
  return new mapboxgl.Marker({ color })
    .setLngLat(coordinates)
    .addTo(map);
};
