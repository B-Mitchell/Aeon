'use client';
import React, { useState, useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const VerifyRecordsPage = () => {
  const mapContainer = useRef(null);
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');

  useEffect(() => {

    // Initialize MapLibre GL map
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://tiles.basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
      center: [9.0820, 8.6753], // Initial center
      zoom: 5, // Initial zoom level
      pitch: 50, // Initial pitch
    });

    // Add map controls
    map.addControl(new maplibregl.ScaleControl(), 'bottom-right');
    map.addControl(new maplibregl.FullscreenControl(), 'bottom-right');
    map.addControl(new maplibregl.NavigationControl(), 'bottom-right');
    map.addControl(new maplibregl.GeolocateControl(), 'bottom-right');

    // Cleanup function
    return () => {
      map.remove();
    };
  }, []);
    const handleSearch = () => {
        // Logic to update the map based on the longitude and latitude input
        console.log(`Searching for coordinates: ${longitude}, ${latitude}`);
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-[#4A7C4A]">Verify Land Records</h1>
            <div className="mb-6">
                <p className="text-center mb-2">Enter Longitude and Latitude to locate the land</p>
                <div className='w-[100%] m-auto block md:flex justify-between'>
                <input
                        type="text"
                        placeholder="Longitude"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        className="p-2 text-center border block m-auto border-gray-300 rounded-lg w-[80%] md:w-[45%] outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Latitude"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        className="p-2 text-center border block m-auto mt-3 md:mt-0 border-gray-300 rounded-lg w-[80%] md:w-[45%] outline-none"
                    />
                </div>
                <button 
                        onClick={handleSearch} 
                        className="bg-blue-500 m-auto block mt-6 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 md:w-[10%]"
                    >
                        Search
                    </button>
            </div>
            <div className="mt-6">
                {/* Placeholder for the Map Component */}
                <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center" ref={mapContainer}
                  style={{
                    width: '100%',
                    height: '25rem', // Set your desired height
                  }}>
                
                </div>
            </div>
        </div>
    );
};

export default VerifyRecordsPage;
