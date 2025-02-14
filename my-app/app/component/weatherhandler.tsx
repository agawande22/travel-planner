'use client';
import { useEffect, useState } from 'react';
import { useSearchState } from './searchcontext';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

export default function Weatherhandler() {
    const {toLocation, checkIn, checkOut, guests} = useSearchState();
    const [weather, setWeather] = useState<Array<object>>([]);
    const [outputIndex, setOutputIndex] = useState<number>(0);
    const today = new Date();
    const dayIndex = today.getDay(); 
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];  

    useEffect(()=>{
        const handleWeather = async () => {
            // console.log(location, checkIn, checkOut, guests);
            // console.log(location);
            try {
                const weatherResult = await fetch('api/weatherresult', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }           
                });
                
                if (weatherResult.status !== 200) {
                    throw new Error(`HTTP error! Status: ${weatherResult.status}`);
                } else {
                    const data = await weatherResult.json(); 
                    setWeather(data.props.weatherResponse.list);
                }
                
                
            } catch (error) {
                // alert('enter valid locations');
                console.error('Error', error);
            }
        };
        handleWeather();
    },[toLocation]);
     console.log(weather);
    return(
        <>
        {/* border: '3px solid grey', borderRadius: 5 */}
        <Typography variant='h4' sx={{textAlign:'start'}}>Weather</Typography>
        <Box sx={{  display: 'flex', flexDirection:'column', border: '3px solid black', borderRadius: 10, gap: 5, my: 5, p: 3}}>
            <Grid2 key={'weather-tile'} sx={{ border: '3px solid grey', borderRadius: 5,  display: 'flex', justifyContent: 'space-between', gap: 2}}>
                <Grid2 sx={{m: 5}}>
                    <Typography variant='h5'>{daysOfWeek[(dayIndex+outputIndex)%7]}</Typography>
                    {/* <Typography>{today.toJSON().slice(0, 10)}</Typography> */}
                </Grid2>
                <Grid2 sx={{ flex: 0.5, display: 'flex', justifyContent: 'right', my: 5}}>
                {weather?
                    (<ul style={{listStyle: 'none', padding: '0'}}>
                        {/* <li key={'temperature'}>Temperature:</li> */}
                        <li key={'maxtemp'}>H: {weather[outputIndex]?.temp.max}°C</li>
                        <li key={'mintemp'}>L: {weather[outputIndex]?.temp.min}°C</li>
                        <li key={'humidity'}>Humidity: {weather[outputIndex]?.humidity}g/m^{3}</li>
                        <li key={'sunrise'}>Sunrise: {weather[outputIndex]?.sunrise}</li>
                        <li key={'sunset'}>Sunset: {weather[outputIndex]?.sunset}</li>
                    </ul>):(<></>)}
                </Grid2>
                <Grid2 sx={{ flex: 0.5}}>
                    {weather?                       
                        (<Tooltip key={outputIndex} title={weather[outputIndex]?.weather[0].description}>
                            <img  src={`https://openweathermap.org/img/wn/${weather[outputIndex]?.weather[0].icon}@2x.png`} alt='Weather' height={200} width={200}/>
                        </Tooltip>):(<></>)}
                </Grid2>
            </Grid2>
            <Grid2 key={'weather-list'} sx={{ display: 'flex', justifyContent:'space-between', alignItems:'center', gap: 1,}}>
                {weather?.map((value, index)=> (
                    <Grid2 key={`weather-item-${index}`} sx={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', border: '3px solid grey', borderRadius: 5}}>
                        <Tooltip key={`tooltip-${index}`} title={weather[index].weather[0].description}>
                        <Button key={`button-${index}`} onClick={()=>{setOutputIndex(index);}}>
                            <ul style={{listStyle: 'none', padding: '0'}}>
                                <li key={`day-${index}`}><Typography key={`${daysOfWeek[(dayIndex+index)%7]}`}>{daysOfWeek[(dayIndex+index)%7]}</Typography></li>
                                <li key={`Htemp-${index}`}><Typography>H: {value?.temp.max}°C</Typography></li>
                                <li key={`Ltemp-${index}`}><Typography> L: {value?.temp.min}°C</Typography></li>
                                <li key={`img-${index}`}><img  src={`https://openweathermap.org/img/wn/${weather[index].weather[0].icon}@2x.png`} alt='Weather' height={100} width={100}/></li>
                            </ul>
                            
                        </Button>
                        </Tooltip>
                    </Grid2>
                ))}
            </Grid2>
        </Box>
        </>
    );
}