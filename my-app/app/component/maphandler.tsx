'use client';

import { useEffect, useRef, useState } from 'react';
import { Map, AdvancedMarker, InfoWindow, MapControl, useMap, useAdvancedMarkerRef, ControlPosition } from '@vis.gl/react-google-maps';
import { GoogleMap, LoadScript, Marker, useJsApiLoader, useLoadScript } from '@react-google-maps/api';
import { useSearchState } from './searchcontext';
import { useUserState } from './usercontext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const containerStyle = {
  width: '100%',
  height: '500px',
};

const defaultCenter = { lat: 22.54992, lng: 0 };

  const Maphandler = () => {
    const { toLocation, listOfAttractions, listOfRestaurants, updateListOfAttractions, updateListOfRestaurants }  = useSearchState();

    const [markerRef, marker] = useAdvancedMarkerRef();
    const [map, setMap] = useState<google.maps.Map | null>(null);
    
    const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

//   interface CustomPlaceResult extends google.maps.places.PlaceResult {
//     isOpen?: boolean | null;
//     // imageUrl?: string | null;
// }  
      
      // const loadPlaces = async () => {
      //   if (!window.google || !toLocation || !toLocation.geometry?.location) {
      //     console.log('Google API not ready or no location found.');
      //     return;
      //   };

      //   const service = new window.google.maps.places.PlacesService(
      //     document.createElement('div'));
  
      //     const requestRestaurants = {
      //       location: toLocation?.geometry?.location, 
      //       radius: 500, 
      //       type: 'restaurants',
      //     };

      //     const requestAttractions = {
      //       location: toLocation?.geometry?.location, 
      //       radius: 500, 
      //       type: 'tourist_attraction',
      //     };

      //     const fetchResults = (
      //       request: google.maps.places.PlaceSearchRequest,
      //       updateFunction: (places: google.maps.places.PlaceResult[]) => void
      //       ) => {
      //       let allResults: google.maps.places.PlaceResult[] = [];
      
      //       const processResults = (results: google.maps.places.PlaceResult[] | null, status: string, pagination: any) => {
      //         if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
      //           allResults = [...allResults, ...results];
      
      //           if (pagination && pagination.hasNextPage) {
      //             setTimeout(() => pagination.nextPage(), 2000);
      //           } else {
      //             console.log(`Final ${request.type} Results:`, allResults);
      //             updateFunction(allResults);
      //           }
      //         } else {
      //           console.warn(`Nearby search for ${request.type} failed:`, status);
      //         }
      //       };
      
      //       service.nearbySearch(request, processResults);
      //     };
      
      //     fetchResults(requestRestaurants, updateListOfRestaurants);
      //     fetchResults(requestAttractions, updateListOfAttractions);
      // };
  
        //   service.nearbySearch(requestRestaurants, (results, status) => {
        //     if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        //       const filteredResults = results?.filter((place) => place.types?.includes('restaurant'));
        //       // fetchPlaceDetails(results || [], updateListOfRestaurants);
        //       updateListOfRestaurants(filteredResults || []);
        //     } else {
        //       console.log('Nearby search failed with status:', status);
        //     }
        //   });
  
        //   service.nearbySearch(requestAttractions, (results, status) => {
        //     if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        //       // fetchPlaceDetails(results || [], updateListOfAttractions);
        //       updateListOfAttractions(results || []);
        //     } else {
        //       console.log('Nearby search failed with status:', status);
        //     }
        //   }
  
  

    useEffect(() => {
      console.log('Updated listOfRestaurants:', listOfRestaurants);
      console.log('Updated listOfAttractions:', listOfAttractions);
    }, [listOfRestaurants, listOfAttractions]);

    if (!isLoaded) {
      return <Typography variant="h5">Loading Map...</Typography>;
    }

    return (
    <>
      <Typography variant='h4' sx={{textAlign:'start'}}>Map</Typography>
      <Box sx={{  display: 'flex', flexDirection:'column', border: '3px solid black', borderRadius: 10, my: 5, p: 3, height: 500}}>
      <GoogleMap
          mapContainerStyle={containerStyle}
          center={toLocation?.geometry?.location || defaultCenter}
          zoom={15}
          onLoad={(map) => {setMap(map); //loadPlaces();

          }}
        >
        </GoogleMap>
      </Box></>
    );
};

export default Maphandler;
