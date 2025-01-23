
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Grid2';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import IconButton from "@mui/material/IconButton";
import Searchbar from "./component/searchbar";
import { JSX } from 'react';


export default function Home(): JSX.Element{

  return (
    // <div className='pages-background'>
      <Container maxWidth={false} sx={{ backgroundImage: 'url(/background.png)', height: 'inherit', width: 'inherit', isplay: 'flex', py: 10, px: 100}}>
        <Box sx={{ bgcolor: 'rgba(0, 0, 0, 0.3)', border: '4px solid white', width: 'lg',  height: 700, borderRadius: 11, p: 10, mx: 10}}>
          {/* <Box  sx={{   height: 'inherit',  borderRadius: 10, }}> */}
            <Searchbar />
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
      // </div>
  );
}

