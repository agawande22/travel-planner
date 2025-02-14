'use client';
import { useEffect, useState } from 'react';
import Searchbar from '../component/searchbar';
import { useSearchState } from '../component/searchcontext';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Weatherhandle from '../component/weatherhandler';
import Maphandler from '../component/maphandler';
import { Map, AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps';
import Flighthandler from '../component/flighthandler';
import Restauranthandler from '../component/restauranthandler';
import Attractionshandler from '../component/attractionshandler';
  
  const TABS_STORAGE_KEY = 'lastSelectedTab';

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

function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}
  

export default function Searchresult(props: TabPanelProps) {

    const {location, checkIn, checkOut, guests} = useSearchState();
    const [value, setValue] = useState<number>(0
  // () => {
  //     const savedTab = localStorage.getItem(TABS_STORAGE_KEY);
  //     return savedTab !== null ? parseInt(savedTab, 10) : 0;
  // }
  );

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        // localStorage.setItem(TABS_STORAGE_KEY, newValue.toString());
    };
  
    return (
      
            <Container maxWidth={false} sx={{  display:'flex', flexDirection: 'column',  alignItems:'center' , height: 'inherit', width: 'inherit', isplay: 'flex', py: 10, px: 100}}>
                <Searchbar color={'#cfd8dc'} contrast={'white'}/>
                <Box sx={{width: '80%'}}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', my:10 }}>
                      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                          <Tab label="Tools" {...a11yProps(0)} />
                          <Tab label="Flights"{...a11yProps(1)} />
                          <Tab label="Restaurants" {...a11yProps(2)} />
                          <Tab label="Attractions" {...a11yProps(3)} />
                      </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <Weatherhandle/>
                        <Maphandler />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                      <Flighthandler />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                      <Restauranthandler />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={3}>
                      <Attractionshandler />
                    </CustomTabPanel>
                </Box>
            </Container>
    );
}