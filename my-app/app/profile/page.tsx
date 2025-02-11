'use client';
import { useCallback, useEffect, useState } from 'react';
import { createClient } from '../../utils/superbase/client';
import { type User } from '@supabase/supabase-js';
import Container from '@mui/material/Container';
import Grid2 from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Fade from '@mui/material/Fade';
import List from '@mui/material/List';
import { ListItemText } from '@mui/material';
import ProfilePic from '../component/profilepic';
import { useUserState } from '../component/usercontext';

export default function AccountForm() {
    const supabase = createClient();
    const {name, curLocation, email, picURL, updateName, updateCurLocation, updateEmail, updatePicURL} = useUserState();
    const [loading, setLoading] = useState(true);
    const [localName, setName] = useState<string | ''>(name);
    const [localCurLocation, setCurLocation] = useState<string | ''>(curLocation);
    const [localPicURL, setPicURL] = useState<string | ''>(picURL);
    const [user, setUser] = useState<User|null>(null);   
    const [anchorFormDisplay, setAnchorFormDisplay] = useState<true | false>(false);

    useEffect(() => { 
        const getUser = async () => {  // Get user from session
            const {data: { user }, } = await supabase.auth.getUser();
            if (user) {
                setUser(user);
            }
        }; 
        getUser(); 
    },[supabase.auth]);

    async function updateProfile({  // Update profile to the database
        name, curLocation, picURL
    }: {
        name: string | null
        curLocation: string | null
        picURL: string | null
    }) {
        try {
        setLoading(true);
        const { error } = await supabase.from('profiles').upsert({
            id: user?.id as string,
            email: user?.email as string,
            updated_at: new Date().toISOString(),
            name,
            cur_location: curLocation,
            pic_url: picURL
        });
        if (error) throw error; 
            alert('Profile updated!');
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    }

    const handleFormDisplay = () => {
        setAnchorFormDisplay((prev) => !prev);
    };

    const handleFormSubmit = () => {
        updateProfile({name:name, curLocation:curLocation, picURL});
        updateName(localName);
        updateCurLocation(localCurLocation);
        updatePicURL(localPicURL);
        setAnchorFormDisplay((prev) => !prev);
    };

    const updateForm = (        
        <Box sx={{width: '400px', border: '3px solid Grey', borderRadius: '5%', px:5, pt:7}}>
            <Typography variant="h6" sx={{color: 'black'}}>Update profile</Typography>
            <TextField id="outlined-basic" label="Full name" variant="outlined" required fullWidth
                        defaultValue="" onChange={(e) => setName(e.target.value)} sx={{display: 'block', width:'500', my: 5}}/>
            <TextField id="outlined-basic" label="Current location" variant="outlined" required fullWidth
                        defaultValue="" onChange={(e) => setCurLocation(e.target.value)} sx={{display: 'block', my: 5}}/>  
            <Button sx={{width: 100, bgcolor: 'black', borderRadius: 10, textTransform: 'none', display: 'block', my: 5}} onClick={handleFormSubmit}>
                    <Typography variant='body1' color='white' fontSize={20}> Update </Typography>
            </Button>            
        </Box>        
    );

    const displayForm = (        
        <Box sx={{ width: '400px', border: '3px solid Grey', borderRadius: '5%', px:5, pt:5}}>
            <List >
                <ListItemText primary={`Name: ${name}`} slotProps={{primary: {sx:{fontSize: 20}}}}/>
                <ListItemText primary={`Email: ${email}`} slotProps={{primary: {sx:{fontSize: 20}}}} />
                <ListItemText primary={`Current location: ${curLocation}`} slotProps={{primary: {sx:{fontSize: 20}}}} />
            </List>
            <Button sx={{width: 100, bgcolor: 'black', borderRadius: 10, textTransform: 'none', display: 'block', my: 5}} onClick={handleFormDisplay}>
                    <Typography variant='body1' color='white' fontSize={20}> Edit </Typography>
            </Button>
        </Box>                    
    );

    return (
        <Container maxWidth={false} sx={{ height: 'inherit', width: 'inherit', isplay: 'flex', py: 5, px: 15}}>
            <Grid2>
                <Typography variant='h2' sx={{display: 'flex', justifyContent:'center', p:5}}>Profile</Typography>
                <Grid2 sx={{display:'flex', justifyContent: 'center', alignContent:'center', gap:30, py:10}}>
                    <Box sx={{height: '300px', width: '300px', border: '3px solid Grey', borderRadius: '50%', alignContent:'center', justifyContent:'center'}}>
                        <ProfilePic uid={user?.id ?? null} url={localPicURL} onUpload={(url)=>{setPicURL(url); 
                            updateProfile({ name, curLocation, picURL: url });}}/>
                    </Box>
                    <Grid2>
                        {anchorFormDisplay? 
                        (<Fade in={anchorFormDisplay}>{updateForm}</Fade>):
                        (<Fade in={!anchorFormDisplay}>{displayForm}</Fade>)}                   
                    </Grid2>
                </Grid2>
            </Grid2>
        </Container>
    );
}