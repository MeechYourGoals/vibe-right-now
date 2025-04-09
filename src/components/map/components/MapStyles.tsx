
import React from 'react';

const MapStyles: React.FC = () => {
  return (
    <style>
      {`
        .leaflet-container {
          font-family: var(--font-sans);
        }
        
        .leaflet-popup-content-wrapper {
          border-radius: 0.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        
        .leaflet-popup-content {
          margin: 0.5rem;
          min-width: 200px;
        }
        
        .leaflet-popup-tip {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        
        .leaflet-control-zoom a {
          background-color: white;
          color: #333;
          border: 1px solid rgba(0,0,0,0.2);
          font-size: 18px;
          height: 30px;
          width: 30px;
          line-height: 30px;
          border-radius: 4px;
          margin-bottom: 5px;
        }
        
        .leaflet-control-zoom a:hover {
          background-color: #f4f4f5;
        }
      `}
    </style>
  );
};

export default MapStyles;
