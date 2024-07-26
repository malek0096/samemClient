import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import mosamemImg from '../assets/samem webp/samem webp/Nft-Artist--Streamline-Milano.webp'
import { useNavigate } from 'react-router-dom';

const MousamemProgram = () => {
    const navigate = useNavigate();
    const handleSeeMoreClick = () => {
        navigate("/signin");
    };
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={4}
            sx={{ backgroundColor: 'transparent', color: '#828282' }}
            fontFamily={""}
            width="80%"
            m="30px auto"
        >
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={6} md={4}>
                    <img
                        src={mosamemImg}
                        alt="Illustration"
                        style={{ width: '100%', height: 'auto' }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={8}>
                    <Typography variant="h3" component="h1" gutterBottom align="left">
                        Mousamem Program
                    </Typography>
                    <Typography variant="h6" component="p" gutterBottom align="left">
                        Unleash Your Creativity with the Mousamem Program
                    </Typography>
                    <Typography variant="body1" component="p" paragraph align="left">
                        Are you a designer with a passion for creating unique and inspiring artwork?
                        Join the Mousamem Program at Samen and turn your creativity into a rewarding career!
                        Our platform offers everything you need to start selling your designs on high-quality apparel and get paid for every unit sold.
                    </Typography>
                </Grid>
                <Button
                    onClick={handleSeeMoreClick}
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2, padding: '10px 20px', fontSize: '16px', textTransform: 'none', width: "40%" }}
                >
                    Join Now
                </Button>
            </Grid>
        </Box>
    );
};

export default MousamemProgram;
