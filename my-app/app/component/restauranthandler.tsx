import { useEffect, useState } from 'react';
import { useSearchState } from './searchcontext';
import Box from '@mui/material/Box';
import { Button, Grid2, List, ListItem, Typography } from '@mui/material';
import { Restaurant } from '@mui/icons-material';

// interface CustomPlaceResult extends google.maps.places.PlaceResult {
//     imageUrl?: string | null;
//     isOpen?: boolean | null;
// }

export default function Restauranthandler() {

    const { listOfRestaurants }  = useSearchState();

    useEffect(() => {
        console.log('Updated listOfRestaurants:', listOfRestaurants);
      }, [listOfRestaurants]);
    
    return (       
        <Box >
            <Typography variant='h3'>Food Places</Typography>
            <Box sx={{ width: '100%', border: '2px solid black', borderRadius: 10, my: 5,}}>           
                {listOfRestaurants.slice(1, listOfRestaurants.length - 1).map((restaurant) => (
                    <Box key={restaurant.place_id} sx={{pt: 5, mx: 6}}>
                        <h3>{restaurant.name}</h3> 
                        <Grid2  sx={{display: 'flex', justifyContent: 'space-between'}}>                                                                 
                            <Box>
                                <img src={restaurant.icon} alt=""/>
                            </Box>
                            <Box>
                                <List>
                                    <ListItem>Address: {restaurant.vicinity}</ListItem>
                                    <ListItem>Ratings: {restaurant.rating}</ListItem>
                                    <ListItem>Total User Ratings: {restaurant.user_ratings_total}</ListItem>
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