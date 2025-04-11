
/**
 * Provides map styling options for different map styles
 */
export const getMapOptions = (mapStyle: "default" | "terrain" | "satellite") => {
  const commonOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: false,
    fullscreenControl: false,
    mapTypeControl: false,
    styles: getMapStyles(mapStyle)
  };

  if (mapStyle === "satellite") {
    return {
      ...commonOptions,
      mapTypeId: 'satellite'
    };
  }

  return commonOptions;
};

/**
 * Get map styles based on the selected style
 */
const getMapStyles = (mapStyle: string) => {
  switch (mapStyle) {
    case "terrain":
      return [
        {
          featureType: "administrative",
          elementType: "labels.text.fill",
          stylers: [{ color: "#444444" }]
        },
        {
          featureType: "landscape",
          elementType: "all",
          stylers: [{ color: "#f2f2f2" }]
        },
        {
          featureType: "poi",
          elementType: "all",
          stylers: [{ visibility: "off" }]
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ visibility: "on" }, { color: "#c5e8c5" }]
        },
        {
          featureType: "road",
          elementType: "all",
          stylers: [{ saturation: -100 }, { lightness: 45 }]
        },
        {
          featureType: "road.highway",
          elementType: "all",
          stylers: [{ visibility: "simplified" }]
        },
        {
          featureType: "road.arterial",
          elementType: "labels.icon",
          stylers: [{ visibility: "off" }]
        },
        {
          featureType: "transit",
          elementType: "all",
          stylers: [{ visibility: "off" }]
        },
        {
          featureType: "water",
          elementType: "all",
          stylers: [{ color: "#b3d8f9" }, { visibility: "on" }]
        }
      ];
    case "default":
    default:
      return [
        {
          featureType: "administrative",
          elementType: "labels.text.fill",
          stylers: [{ color: "#444444" }]
        },
        {
          featureType: "poi",
          elementType: "all",
          stylers: [{ visibility: "off" }]
        },
        {
          featureType: "transit",
          elementType: "all",
          stylers: [{ visibility: "off" }]
        }
      ];
  }
};
