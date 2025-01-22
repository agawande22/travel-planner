"use client";
import React, { useState, MouseEvent, JSX } from "react";
import { ThemeProvider } from '@emotion/react';
import theme from './component/theme'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Grid2';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from "@mui/icons-material/Remove";


export default function Home(): JSX.Element{

  const [location, setLocation] = useState<string>("");
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guestsAnchor, setGuestsAnchor] = useState<null | HTMLElement>(null);
  const [guests, setGuests] = useState<number>(1);

  const incrementGuests = () => {
    setGuests((prev) => prev + 1);
  };

  const decrementGuests = () => {
    setGuests((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleSearchClick = () => {
    console.log(location, checkIn, checkOut, guests)
  }


  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Container maxWidth="xl" sx={{display: 'flex', height: 'inherit', py: 10}}>
          <Box sx={{ bgcolor: 'rgba(0, 0, 0, 0.3)', border: '4px solid white', width: 'inherit',  height: 700, borderRadius: 11, p: 10}}>
            {/* <Box  sx={{   height: 'inherit',  borderRadius: 10, }}> */}
              <Grid2 display={'flex'} gap={5}>
                <Box  sx={{ flex:1.5, height: 80, bgcolor: 'white', border: '2px solid black', borderRadius: 10}}>
                  <Grid2 container spacing={2}  ml={2}>
                    <Grid2 size={{ xs: 6, md: 3 }} offset={{ xs: 3, md: 0 }}>
                      <TextField variant="standard"
                        placeholder="Place"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        sx={{ flex: 1, my: 3, mx: 4}}></TextField>                     
                    </Grid2>
                    <Box sx={{color: '#cfd8dc', alignSelf:'center', width: 0, height: 50, border: '1px solid #cfd8dc' }}></Box>                    
                    <Grid2 size={{ xs: 6, md: 2 }} offset={{ xs: 3, md: 0 }}>
                      <DatePicker
                        label="Check-in"
                        value={checkIn}
                        onChange={(newValue: Date | null) => setCheckIn(newValue)}
                        slots={{
                          textField: (props) => <TextField {...props} variant="standard" />,
                        }}
                        slotProps={{
                          textField: { InputProps: { disableUnderline: true }, sx: { flex: 1, my: 2 } },
                        }}
                      />
                    </Grid2>
                    <Box sx={{color: '#cfd8dc', alignSelf:'center', width: 0, height: 50, border: '1px solid #cfd8dc', mx: 4}}></Box>
                    <Grid2 size={{ xs: 6, md: 2 }} offset={{ xs: 3, md: 0 }}>
                      <DatePicker
                          label="Check-out"
                          value={checkOut}
                          onChange={(newValue: Date | null) => setCheckOut(newValue)}
                          slots={{
                            textField: (props) => <TextField {...props} variant="standard" />,
                          }}
                          slotProps={{
                            textField: { InputProps: { disableUnderline: true }, sx: { flex: 1, my: 2 } },
                          }}
                        />
                    </Grid2>
                    <Box sx={{color: '#cfd8dc', alignSelf:'center', width: 0, height: 50, border: '1px solid #cfd8dc', mx: 4 }}></Box>
                    <Grid2 size={{ xs: 6, md: 2 }} offset={{ xs: 3, md: 0 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          flex: 1,
                          m: 3,
                          justifyContent: "center",
                        }}
                        >
                        <Typography>Guests:</Typography>
                        <IconButton
                          onClick={decrementGuests}
                          sx={{ border: "1px solid #ddd", borderRadius: "50%" }}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography
                          sx={{
                            width: "30px",
                            textAlign: "center",
                            fontSize: "1.2rem",
                          }}
                        >
                          {guests}
                        </Typography>
                        <IconButton
                          onClick={incrementGuests}
                          sx={{ border: "1px solid #ddd", borderRadius: "50%" }}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </Grid2>
                  </Grid2>
                </Box>
              
              <Button sx={{flex:0.3, bgcolor: 'primary.main', borderRadius: 10, textTransform: 'none'}} onClick={handleSearchClick}>
                <Typography variant='body1' color='white' fontSize={20}>
                  Search
                </Typography>
              </Button>
              </Grid2>
              <Typography variant='h1' sx={{my: 7, mx:15, color: 'white', textAlign: 'center'}}>
                Adventure Awaits: 
                Plan Your Perfect Trip
              </Typography>
              <Typography variant='h4' sx={{ color: 'white', textAlign: 'center'}}>
                Your journey starts here
              </Typography>
            </Box>
          {/* </Box> */}
        </Container>
        </LocalizationProvider>
    </ThemeProvider>
  );
}
// function useState(arg0: string): [any, any] {
//   throw new Error('Function not implemented.');
// }

