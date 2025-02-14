'use client';

import { JSX, useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import { useSearchState } from './searchcontext';
import { useMapsLibrary } from '@vis.gl/react-google-maps';

interface PlaceAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

export default function PlaceAutocomplete({ onPlaceSelect }: PlaceAutocompleteProps): JSX.Element {
  const [placeAutocomplete, setPlaceAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const {location, updateLocation} = useSearchState();
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary('places');
  


  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ['geometry', 'name', 'formatted_address']
    };
    const autocomplete = new places.Autocomplete(inputRef.current, options);
    setPlaceAutocomplete(autocomplete);

    return () => {
      google.maps.event.clearInstanceListeners(autocomplete);
    };
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    const handlePlaceChange = () => {
      const place = placeAutocomplete.getPlace();
      if (place?.formatted_address) {
        setSelectedAddress(place.formatted_address);
      }
      onPlaceSelect(place);
    };

    placeAutocomplete.addListener('place_changed', handlePlaceChange);

    return () => {
      google.maps.event.clearInstanceListeners(placeAutocomplete);
    };
  }, [onPlaceSelect, placeAutocomplete]);

  return (
      <TextField variant="standard" value={selectedAddress} onChange={(e) => setSelectedAddress(e.target.value)} placeholder="City, State, Country" inputRef={inputRef}
                    sx={{ my: 3, ml: 5}} required></TextField> 
  );
};