'use client'
import React, { useEffect, useRef, useState } from 'react';
import supabase from '@/app/supabase';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const Page = ({ params }) => {
  let route = params.moreInfo;
  const mapContainer = useRef(null);
  const [loading, setLoading] = useState(false);
  const [fetchedRecord, setFetchedRecord] = useState([]);

  const fetchLandRecord = async () => {
    try {
      setLoading(true);
      let { data, error } = await supabase
        .from('LAND RECORDS')
        .select('*')
        .eq('id', route);

      if (data) {
        setFetchedRecord(data);
        console.log(data);
      } else {
        console.log(error);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(route);
    fetchLandRecord();
    console.log(fetchedRecord);

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

  return (
    <div className="container mx-auto p-6">
      <p className='text-center text-[2rem] font-bold'>Land Details</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-green-400"
          ref={mapContainer}
          style={{
            width: '100%',
            height: '25rem', // Set your desired height
          }}
        ></div>

        {loading ? (
          <p className="text-center mt-10 animate-pulse md:mt-0">Loading record...</p>
        ) : (
          fetchedRecord.length > 0 && (
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-2 text-center md:mb-5">{fetchedRecord[0].name}</h2>
              <p className="text-gray-700 md:mb-4"><strong>ID:</strong> {fetchedRecord[0].id}</p>
              <p className="text-gray-700 md:mb-4"><strong>Location:</strong> {fetchedRecord[0].location}</p>
              <p className="text-gray-700 md:mb-4"><strong>Size:</strong> {fetchedRecord[0].size}</p>
              <p className="text-gray-700 md:mb-4"><strong>Owner:</strong> {fetchedRecord[0].owner}</p>
              <p className="text-gray-700 md:mb-4"><strong>Ownership Type:</strong> {fetchedRecord[0].ownershipType}</p>
              <p className="text-gray-700 md:mb-4"><strong>Zoning:</strong> {fetchedRecord[0].zoning}</p>
              <p className="text-gray-700 md:mb-4"><strong>Registered Date:</strong> {fetchedRecord[0].registeredDate}</p>
              <p className="text-gray-700 md:mb-4"><strong>Market Value:</strong> {fetchedRecord[0].marketValue}</p>
            </div>
          )
        )}
      </div>
      <div className='mt-3'>
        <button className='m-auto block bg-blue-500 text-white rounded-lg p-3 w-[10rem] shadow hover:bg-blue-600'>Place Bid</button>
      </div>
    </div>
  );
};

export default Page;
