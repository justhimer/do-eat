import { GoogleMap } from '@capacitor/google-maps';
import { useEffect, useRef } from 'react';


export function GoogleMapComp() {
  const mapRef = useRef<HTMLElement>();
  let newMap: GoogleMap;
  const apiKey = "AIzaSyAy_SQpiVPr38hMLZLWRqS6GHTaWtrdbm0"

  async function createMap() {
    if (!mapRef.current) return;

    newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: mapRef.current,
      apiKey: apiKey,
      config: {
        center: {
          lat: 33.6,
          lng: -117.9
        },
        zoom: 8
      }
    })
  }
  useEffect(()=>{
    console.log("load")
    createMap()
  },[])

  return (
    <div className="component-wrapper">
      <capacitor-google-map ref={mapRef} style={{
        display: 'inline-block',
        width: 275,
        height: 400
      }}></capacitor-google-map>

    </div>
  )
}