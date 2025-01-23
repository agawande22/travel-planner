"use client";

import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { JSX, useState } from "react";
import theme from "./theme";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Grid2 from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from "@mui/icons-material/Remove";
import { Container } from "@mui/material";

export default function Searchbar(): JSX.Element{

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
            <Container maxWidth='lg'>
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
              </Container>
            </LocalizationProvider>
            </ThemeProvider>
            )
    }