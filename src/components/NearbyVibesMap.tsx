
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Navigation, Compass, X, Layers, MapIcon } from "lucide-react";
import { mockLocations } from "@/mock/locations";
import { Location } from "@/types";
import { useNavigate, useLocation } from "react-router-dom";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { mockPosts } from "@/mock/data";
import VenuePost from "@/components/VenuePost";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Temporary Mapbox token - in production, this should be stored in environment variables
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2xyMXp5eWJoMDJ1bTJpcGV3ZXRiZms5dCJ9.hMHS6RL9nNpwqMYlXn8l5A';
mapboxgl.accessToken = MAPBOX_TOKEN;

const NearbyVibesMap = () => {
  const [userLocation, setUserLocation] = useState<GeolocationCoordinates | null>(null);
  const [nearbyLocations, setNearbyLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [mapStyle, setMapStyle] = useState<"default" | "terrain" | "satellite">("terrain");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [searchedCity, setSearchedCity] = useState("");
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract city from URL search params, if available
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q') || '';
    
    // Try to extract city from search query (assuming format like "City, State")
    if (q) {
      const city = q.split(',')[0].trim();
      setSearchedCity(city);
    } else {
      setSearchedCity("");
    }
  }, [location]);
  
  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(position.coords);
          
          // Filter locations within 10 miles of user
          const nearbyVenues = mockLocations.filter((loc) => {
            // Simple distance calculation for demo purposes
            const distance = Math.sqrt(
              Math.pow(loc.lat - position.coords.latitude, 2) +
              Math.pow(loc.lng - position.coords.longitude, 2)
            );
            // Convert to roughly miles (this is very approximate)
            const milesAway = distance * 69;
            return milesAway <= 10;
          });
          
          setNearbyLocations(nearbyVenues);
          initializeMap(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          // Use all locations as fallback
          setNearbyLocations(mockLocations);
          // Default to US center if no location
          initializeMap(39.8283, -98.5795);
        }
      );
    } else {
      // Use all locations as fallback
      setNearbyLocations(mockLocations);
      // Default to US center if no location
      initializeMap(39.8283, -98.5795);
    }

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
      // Clear all markers
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
    };
  }, []);

  // Initialize the map
  const initializeMap = (lat: number, lng: number) => {
    if (!mapContainerRef.current) return;
    
    // Create new map
    const newMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapStyle === 'satellite' 
        ? 'mapbox://styles/mapbox/satellite-streets-v12'
        : mapStyle === 'terrain' 
          ? 'mapbox://styles/mapbox/outdoors-v12' 
          : 'mapbox://styles/mapbox/streets-v12',
      center: searchedCity 
        ? [lng, lat] // Use coordinates for the searched city
        : [lng, lat], // Default to user location or US center
      zoom: searchedCity ? 12 : 4,
      projection: 'mercator'
    });
    
    // Add navigation controls
    newMap.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    // Add markers for locations
    newMap.on('load', () => {
      setLoading(false);
      
      // Add markers
      if (nearbyLocations.length > 0) {
        addMarkersToMap(newMap, nearbyLocations);
      }
      
      // Add user location marker
      if (userLocation) {
        new mapboxgl.Marker({ color: '#FF9900' })
          .setLngLat([userLocation.longitude, userLocation.latitude])
          .addTo(newMap);
      }
    });
    
    mapRef.current = newMap;
  };
  
  // Add markers to map
  const addMarkersToMap = (map: mapboxgl.Map, locations: Location[]) => {
    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
    
    locations.forEach((loc, index) => {
      // Create custom HTML element for marker
      const el = document.createElement('div');
      el.className = 'location-marker';
      el.style.width = '20px';
      el.style.height = '20px';
      el.style.borderRadius = '50%';
      el.style.backgroundColor = 'rgba(var(--primary), 0.9)';
      el.style.border = '2px solid white';
      el.style.cursor = 'pointer';
      
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
      
      // Create and add marker
      const marker = new mapboxgl.Marker(el)
        .setLngLat([loc.lng, loc.lat])
        .addTo(map);
      
      // Add popup on hover
      const popup = new mapboxgl.Popup({ offset: 25, closeButton: false, closeOnClick: false })
        .setHTML(`
          <div style="padding: 8px;">
            <div style="font-weight: bold;">${loc.name}</div>
            <div style="font-size: 12px; color: #666;">${loc.type} in ${loc.city}</div>
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
        setSelectedLocation(loc);
      });
      
      // Store marker for later cleanup
      markersRef.current.push(marker);
    });
  };

  // Update map when style changes
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setStyle(
        mapStyle === 'satellite' 
          ? 'mapbox://styles/mapbox/satellite-streets-v12'
          : mapStyle === 'terrain' 
            ? 'mapbox://styles/mapbox/outdoors-v12' 
            : 'mapbox://styles/mapbox/streets-v12'
      );
    }
  }, [mapStyle]);
  
  // Update map when map container is expanded or collapsed
  useEffect(() => {
    if (mapRef.current) {
      // Resize map after a brief timeout to ensure the container has been resized
      setTimeout(() => {
        mapRef.current?.resize();
        
        // Re-center the map
        if (userLocation) {
          mapRef.current?.setCenter([userLocation.longitude, userLocation.latitude]);
        }
      }, 100);
    }
  }, [isMapExpanded]);

  const handleViewMap = () => {
    navigate("/explore");
  };

  const toggleMapExpansion = () => {
    setIsMapExpanded(!isMapExpanded);
    setSelectedLocation(null);
  };

  const handleLocationClick = (locationId: string) => {
    navigate(`/venue/${locationId}`);
  };

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    
    // Fly to location
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [location.lng, location.lat],
        zoom: 15,
        speed: 1.2,
        curve: 1,
        essential: true
      });
    }
  };

  const changeMapStyle = (style: "default" | "terrain" | "satellite") => {
    setMapStyle(style);
  };

  // Find vibes for a specific location
  const getLocationVibes = (locationId: string) => {
    return mockPosts.filter(post => post.location.id === locationId).slice(0, 2);
  };

  // Helper function to get ride service URL
  const getRideServiceUrl = (place: Location) => {
    // Simulate a partnership with Uber
    const partnerService = "uber";
    
    // Create the deep link to the ride service app
    return `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=${encodeURIComponent(`${place.address}, ${place.city}, ${place.state}`)}`;
  };

  // Helper function to get official ticket or venue URL
  const getOfficialUrl = (place: Location) => {
    // For sports venues, we would typically have specific ticket platform partnerships
    if (place.type === "sports") {
      // Use the same logic as in VenuePost to get ticket URLs
      const ticketUrls: Record<string, string> = {
        "30": "https://www.axs.com/events/crypto-com-arena", // Lakers
        "31": "https://www.therams.com/tickets/", // Rams
        "32": "https://www.mlb.com/dodgers/tickets", // Dodgers
        "33": "https://www.lagalaxy.com/tickets/", // LA Galaxy
        "34": "https://www.vbusa.org/tickets", // Venice Beach Volleyball
        "35": "https://wmphoenixopen.com/tickets/", // WM Phoenix Open
      };
      
      return ticketUrls[place.id] || `https://seatgeek.com/${place.city.toLowerCase()}-tickets`;
    }
    
    // For events, we'd link to event ticket platforms
    if (place.type === "event") {
      return `https://www.ticketmaster.com/search?q=${encodeURIComponent(place.name)}`;
    }
    
    // For restaurants, we would link to reservation platforms
    if (place.type === "restaurant") {
      return `https://www.opentable.com/s?term=${encodeURIComponent(place.name)}&queryId=${place.id}`;
    }
    
    // For bars and attractions, default to their presumed website
    return `https://${place.name.toLowerCase().replace(/\s+/g, '')}.com`;
  };

  // Get media for the location
  const getMediaForLocation = (location: Location) => {
    // Return appropriate media based on location type and name
    const imageMap: Record<string, string> = {
      // Sports venues
      "30": "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=1000&auto=format&fit=crop",  // Lakers
      "31": "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=1000&auto=format&fit=crop",  // Rams
      "32": "https://images.unsplash.com/photo-1566577134624-d9b13555e288?q=80&w=1000&auto=format&fit=crop",  // Dodgers
      "33": "https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=1000&auto=format&fit=crop",  // LA Galaxy
      "34": "https://images.unsplash.com/photo-1530915872-13619796d013?q=80&w=1000&auto=format&fit=crop",    // Volleyball
      "35": "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=1000&auto=format&fit=crop",  // Golf
    };

    // Default media based on type if no specific image is available
    const typeDefaultMedia: Record<string, string> = {
      "restaurant": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop",
      "bar": "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=1000&auto=format&fit=crop",
      "event": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop",
      "attraction": "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=1000&auto=format&fit=crop",
      "sports": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000&auto=format&fit=crop",
      "other": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop",
    };

    return {
      type: "image" as const,
      url: imageMap[location.id] || typeDefaultMedia[location.type] || `https://source.unsplash.com/random/800x600/?${location.type},${location.city}`
    };
  };
  
  // Add CSS to the document head for marker animations
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes pulse {
        0% { transform: translate(-5px, -5px) scale(1); opacity: 1; }
        100% { transform: translate(-5px, -5px) scale(1.5); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return (
    <div className={`space-y-4 ${isMapExpanded ? "fixed inset-0 z-50 bg-background p-4" : ""}`}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Nearby Vibes</h2>
        <div className="flex gap-2">
          {isMapExpanded ? (
            <>
              <div className="flex items-center bg-muted/30 rounded-md p-1">
                <Button 
                  variant={mapStyle === "default" ? "secondary" : "ghost"} 
                  size="sm" 
                  className="gap-1" 
                  onClick={() => changeMapStyle("default")}
                >
                  <MapIcon className="h-4 w-4" />
                </Button>
                <Button 
                  variant={mapStyle === "terrain" ? "secondary" : "ghost"} 
                  size="sm" 
                  className="gap-1" 
                  onClick={() => changeMapStyle("terrain")}
                >
                  <Layers className="h-4 w-4" />
                </Button>
                <Button 
                  variant={mapStyle === "satellite" ? "secondary" : "ghost"} 
                  size="sm" 
                  className="gap-1" 
                  onClick={() => changeMapStyle("satellite")}
                >
                  <Navigation className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="gap-1" onClick={toggleMapExpansion}>
                <X className="h-4 w-4" />
                Close Map
              </Button>
            </>
          ) : (
            <Button variant="ghost" size="sm" className="gap-1" onClick={toggleMapExpansion}>
              <Navigation className="h-4 w-4" />
              Expand Map
            </Button>
          )}
          {!isMapExpanded && (
            <Button variant="ghost" size="sm" className="gap-1" onClick={handleViewMap}>
              <Navigation className="h-4 w-4" />
              View Map
            </Button>
          )}
        </div>
      </div>
      
      {loading ? (
        <div className={`bg-muted/20 rounded-lg flex items-center justify-center ${isMapExpanded ? "h-[85vh]" : "h-60"}`}>
          <div className="animate-spin">
            <Compass className="h-8 w-8 text-muted-foreground" />
          </div>
        </div>
      ) : (
        <div 
          ref={mapContainerRef}
          className={`relative ${isMapExpanded ? "h-[85vh]" : "h-60"} rounded-lg overflow-hidden transition-all`}
        >
          {/* Selected location detail sidebar */}
          {isMapExpanded && selectedLocation && (
            <div className="absolute right-4 top-4 w-1/3 max-h-[70vh] bg-background/90 backdrop-blur-sm rounded-lg p-4 shadow-lg overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">{selectedLocation.name}</h3>
                <Button variant="ghost" size="sm" onClick={() => setSelectedLocation(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-sm text-muted-foreground flex items-center mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{selectedLocation.address}, {selectedLocation.city}, {selectedLocation.state}</span>
              </div>
              
              <div className="space-y-2 mb-4">
                <Button className="w-full" onClick={() => handleLocationClick(selectedLocation.id)}>
                  View All Vibes
                </Button>
                <div className="flex gap-2">
                  <a 
                    href={getRideServiceUrl(selectedLocation)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="outline" className="w-full">
                      Order a Ride
                    </Button>
                  </a>
                  <a 
                    href={getOfficialUrl(selectedLocation)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="outline" className="w-full">
                      {selectedLocation.type === "restaurant" ? "Reservations" : 
                       selectedLocation.type === "sports" || selectedLocation.type === "event" ? "Tickets" : 
                       "Website"}
                    </Button>
                  </a>
                </div>
              </div>
              
              <h4 className="font-medium text-sm mb-2">Recent Vibes</h4>
              <div className="space-y-4">
                {getLocationVibes(selectedLocation.id).length > 0 ? (
                  getLocationVibes(selectedLocation.id).map(post => (
                    <VenuePost
                      key={post.id}
                      venue={selectedLocation}
                      content={post.content}
                      media={getMediaForLocation(selectedLocation)}
                      timestamp={post.timestamp}
                    />
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No recent vibes for this location.</p>
                )}
              </div>
            </div>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 p-3 glass-effect bg-background/70 backdrop-blur-sm">
            <p className="text-sm">
              {nearbyLocations.length} Vibes within 10 miles of you
            </p>
          </div>
        </div>
      )}
      
      {!isMapExpanded && (
        <div className="grid grid-cols-2 gap-3">
          {nearbyLocations.slice(0, 4).map((location) => (
            <Card key={location.id} className="hover:bg-muted/20 transition-colors">
              <CardContent className="p-3">
                <div className="font-medium text-sm truncate">{location.name}</div>
                <div className="text-xs text-muted-foreground flex items-center mt-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span className="truncate">{location.city}</span>
                </div>
                <div className="mt-2 flex flex-col gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full h-7 text-xs"
                    onClick={() => handleLocationClick(location.id)}
                  >
                    View Vibes
                  </Button>
                  <div className="flex gap-1">
                    <a 
                      href={getRideServiceUrl(location)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button variant="outline" size="sm" className="w-full h-7 text-xs">
                        Order a Ride
                      </Button>
                    </a>
                    <a 
                      href={getOfficialUrl(location)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button variant="outline" size="sm" className="w-full h-7 text-xs">
                        {location.type === "restaurant" ? "Reserve" : 
                         location.type === "sports" || location.type === "event" ? "Tickets" : 
                         "Website"}
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {!isMapExpanded && nearbyLocations.length > 4 && (
        <Button variant="ghost" size="sm" className="w-full" onClick={handleViewMap}>
          See All {nearbyLocations.length} Nearby Locations
        </Button>
      )}
    </div>
  );
};

export default NearbyVibesMap;
