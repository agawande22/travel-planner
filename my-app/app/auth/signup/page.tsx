"use client";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { JSX, useState } from "react";
import theme from "../../component/theme";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import image from "../../../public/background.png";
import Link from "@mui/material/Link";
import Grid2 from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";


const providers = [{ id: 'credentials', name: 'Email and Password' }];

export default function Signup(): JSX.Element {

    const [name, setName] = useState<string>("");
    const [curLocation, setCurLocation] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleClick = () => {
        console.log(name, curLocation, email, password)
    }

    return (


        <ThemeProvider theme={theme}>
            <div className="pages-background">
            <Container maxWidth={false} disableGutters sx={{display: 'flex', height: 'inherit', margin: 0}}>
                <Box component="form" sx={{ display: 'flex', width: '60%', justifyContent:'center', alignItems: 'center' }}
                            noValidate
                            autoComplete="off">
                    <Grid2 >
                        
                        <Typography variant="h3" sx={{color: 'black'}}>Create New Account</Typography>
                        <Typography variant="h6" sx={{color: 'black'}}>Already registered? <Link href='/auth/signin'>signin</Link></Typography>
                        <Container disableGutters sx={{width:'70%', margin:0}}>
                            <TextField id="outlined-basic" label="Full name" variant="outlined" required fullWidth
                                        defaultValue="" onChange={(e) => setName(e.target.value)} sx={{display: 'block', width:'500', my: 5}}/>
                            <TextField id="outlined-basic" label="Current location" variant="outlined" required fullWidth
                                        defaultValue="" onChange={(e) => setCurLocation(e.target.value)} sx={{display: 'block', my: 5}}/>
                            <TextField id="outlined-basic" label="Email" variant="outlined" required fullWidth
                                        defaultValue="" onChange={(e) => setEmail(e.target.value)} sx={{display: 'block', my: 5}}/>
                            <TextField id="outlined-basic" label="Password" variant="outlined" required fullWidth
                                    defaultValue="" onChange={(e) => setPassword(e.target.value)} sx={{display: 'block', my: 5}}/>
                            <Button sx={{width: 100, bgcolor: 'black', borderRadius: 10, textTransform: 'none'}} onClick={handleClick}>
                                <Typography variant='body1' color='white' fontSize={20}>
                                Sign up
                                </Typography>
                            </Button>
                        </Container>                       
                    </Grid2>                   
                </Box>
                <Box sx={{width: '50%', height: '94vh', backgroundImage: 'url(/mkw.jpg)'}}>
                    
                </Box>
            </Container>
            </div>
        </ThemeProvider>
    )
}