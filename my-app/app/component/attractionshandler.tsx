import { useSearchState } from './searchcontext';
import Box from '@mui/material/Box';
import { Button, Grid2, List, ListItem, Typography } from '@mui/material';
import { useEffect } from 'react';

// interface CustomPlaceResult extends google.maps.places.PlaceResult {
//     imageUrl?: string | null;
//     isOpen?: boolean | null;
// }

export default function Restauranthandler() {

    const { toLocation, listOfAttractions, listOfRestaurants, updateListOfAttractions, updateListOfRestaurants }  = useSearchState();

    useEffect(() => {
          console.log('Updated listOfAttractions:', listOfAttractions);
        }, [ listOfAttractions]);
    
    return (     
        <Box >
            <Typography variant='h3'>Tourist Attractions</Typography>
            <Box sx={{ width: '100%', border: '2px solid black', borderRadius: 10, my: 5,}}>               
                {listOfAttractions.slice(1, listOfRestaurants.length - 1).map((attraction) => (
                    <Box key={attraction.place_id} sx={{pt: 5, mx: 6}}>
                        <h3>{attraction.name}</h3> 
                        <Grid2  sx={{display: 'flex', justifyContent: 'space-between'}}>                                                                 
                            <Box>
                                <img src={attraction.icon} alt=""/>
                            </Box>
                            <Box>
                                <List>
                                    <ListItem>Address: {attraction.vicinity}</ListItem>
                                    <ListItem>Ratings: {attraction.rating}</ListItem>
                                    <ListItem>Total User Ratings: {attraction.user_ratings_total}</ListItem>
                                </List>
                            </Box>
                            <Button sx={{alignSelf: 'end'}}>Save</Button>
                        </Grid2>    
                        <Box sx={{alignSelf:'center', width: '100%', height: 0, border: '1px solid grey', my: 5 }}></Box>               
                    </Box>
                ))}
            </Box>
        </Box>
    ); 
}