'use client';

import  TextField  from '@mui/material/TextField';
import { useSearchState } from './searchcontext';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import { ReactHTMLElement, useEffect, useState } from 'react';
import PlaceAutocomplete from './placeautocomplete';
import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

interface Flight {
    itineraries: {
        segments: {
            departure: { iataCode: string };
            arrival: { iataCode: string };
        }[];
    }[];
    price: { total: string };
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
}

export default function Flighthandler() {
    const {toLocation, fromLocation, checkIn, checkOut} = useSearchState();
    const [onewayFlights, setOnewayFlights] = useState<Flight[]>([]);
    const [returnFlights, setReturnFlights] = useState<Flight[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [trip, setTrip] = useState<number>(0);

    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const searchFlights = async (date: string | null, origin: string | undefined, destination: string | undefined) => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await fetch(`/api/flightresult?originKeyword=${origin}&destinationKeyword=${destination}&dateOfDeparture=${checkIn?formatDate(checkIn):null}`);
            const data = await response.json();

            if (response.ok) {
                setOnewayFlights(data.data);
            } else {
                setError(data.error || 'Failed to fetch flights');
            }
        } catch (err) {
            if(err) {
                setError('Something went wrong');
            }
        } finally {
            setLoading(false);
        }

        try {
            const response = await fetch(`/api/flightresult?originKeyword=${destination}&destinationKeyword=${origin}&dateOfDeparture=${checkOut?formatDate(checkOut):null}`);
            const data = await response.json();

            if (response.ok) {
                setReturnFlights(data.data);
            } else {
                setError(data.error || 'Failed to fetch flights');
            }
        } catch (err) {
            if(err) {
                setError('Something went wrong');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleOnewaySearch = async () => {
        if(checkIn && fromLocation && toLocation) {
            searchFlights(formatDate(checkIn), fromLocation?.name, toLocation?.name);
            setTrip(0);
            console.log(onewayFlights);
        }      
    };

    const handleReturnSearch = async () => {
        setTrip(1);
    };

    return (
        <Box>
            <Typography variant='h4' sx={{textAlign:'start'}}>Flights</Typography>          
            <Grid2 sx={{display: 'flex', justifyContent:'space-evenly', my:5}} gap={10}>
                <Button onClick={handleOnewaySearch} disabled={loading}>
                    {loading ? 'Searching...' : 'One way Flights'}
                </Button>
                <Button onClick={handleReturnSearch} disabled={loading}>
                    Return Flights
                </Button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            </Grid2>
            <Box sx={{  display: 'flex', flexDirection:'column', border: '2px solid black', borderRadius: 10, gap: 5, my: 4, p: 3}}>
                <Grid2 sx={{display: 'flex', justifyContent:'space-evenly', mr:15}}>
                    <Typography variant='h6'>No.</Typography>
                    <Typography variant='h6'>Duration</Typography>
                    <Typography variant='h6'>To</Typography>
                    <Typography variant='h6'>Time</Typography>
                    <Typography variant='h6'>From</Typography>
                    <Typography variant='h6'>Time</Typography>
                    <Typography variant='h6'>Price</Typography>
                    <Typography variant='h6'></Typography>
                    
                </Grid2>
                {trip?(
                    <Grid2>
                        {returnFlights.map((flight, index) => (
                            <Grid2 key={index} sx={{my:5}}>                                 
                                <Grid2 display={'flex'} justifyContent={'space-evenly'}>      
                                    <Typography>{index + 1}</Typography>   
                                    <Typography >{flight.itineraries[0].duration.slice(2)}</Typography>                                                                                   
                                    <Typography>{flight.itineraries[0].segments[0].departure.iataCode}</Typography>
                                    <Typography>({flight.itineraries[0].segments[0].departure.at})</Typography>
                                    <Typography>{flight.itineraries[0].segments[0].arrival.iataCode}</Typography>
                                    <Typography>({flight.itineraries[0].segments[0].arrival.at})</Typography>
                                    <Typography>{flight.price.total}</Typography>
                                    <Button>Save</Button> 
                                </Grid2>
                                
                                {(flight.itineraries[0].segments.length > 1)?(
                                    <Grid2 sx={{display: 'flex', justifyContent:'center', gap:7, mr: 5}}  >                                        
                                        <Typography>{flight.itineraries[0].segments[1].departure.iataCode}</Typography>
                                        <Typography>({flight.itineraries[0].segments[1].departure.at})</Typography>
                                        <Typography>{flight.itineraries[0].segments[1].arrival.iataCode}</Typography>
                                        <Typography>({flight.itineraries[0].segments[1].arrival.at})</Typography>
                                    </Grid2>
                                ):(
                                    <></>
                                )}
                                                                  
                            </Grid2>
                        ))}                     
                    </Grid2>
                ):(
                    <Grid2>
                        {onewayFlights.map((flight, index) => (
                            <Grid2 key={index} sx={{my:5}}>                                 
                            <Grid2 display={'flex'} justifyContent={'space-evenly'}>      
                                <Typography>{index + 1}</Typography>   
                                <Typography >{flight.itineraries[0].duration.slice(2)}</Typography>                                                                                   
                                <Typography>{flight.itineraries[0].segments[0].departure.iataCode}</Typography>
                                <Typography>({flight.itineraries[0].segments[0].departure.at})</Typography>
                                <Typography>{flight.itineraries[0].segments[0].arrival.iataCode}</Typography>
                                <Typography>({flight.itineraries[0].segments[0].arrival.at})</Typography>
                                <Typography>{flight.price.total}</Typography>
                                <Button>Save</Button> 
                            </Grid2>
                            
                            {(flight.itineraries[0].segments.length > 1)?(
                                <Grid2 sx={{display: 'flex', justifyContent:'center', gap:7, mr: 5}}  >                                        
                                    <Typography>{flight.itineraries[0].segments[1].departure.iataCode}</Typography>
                                    <Typography>({flight.itineraries[0].segments[1].departure.at})</Typography>
                                    <Typography>{flight.itineraries[0].segments[1].arrival.iataCode}</Typography>
                                    <Typography>({flight.itineraries[0].segments[1].arrival.at})</Typography>
                                </Grid2>
                            ):(
                                <></>
                            )}                                                              
                        </Grid2>
                        ))}
                        
                    </Grid2>
                )}
                
                
            </Box>
        </Box>
    );
}