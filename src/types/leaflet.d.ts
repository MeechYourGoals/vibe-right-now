
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { LatLngExpression, Icon, LeafletEventHandlerFnMap } from 'leaflet';

declare module 'react-leaflet' {
  interface MapContainerProps {
    center: LatLngExpression;
    zoom: number;
    scrollWheelZoom?: boolean;
    style?: React.CSSProperties;
  }
  
  interface TileLayerProps {
    attribution?: string;
    url: string;
  }
  
  interface MarkerProps {
    position: LatLngExpression;
    icon?: Icon;
    eventHandlers?: LeafletEventHandlerFnMap;
  }
}

declare global {
  interface Window {}
}
