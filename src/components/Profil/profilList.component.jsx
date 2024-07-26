import { Box, Typography, Avatar, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";



const DisplayProfiles = (props) => {
    const { profiles } = props
    const navigate = useNavigate();

    return (
        <Box width="80%" m="30px auto">
            <Typography variant="h5" fontWeight="bold" mb={2} textAlign="center">
                Creative Artists Behind This Awesome Project
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                {profiles?.map((profile) => (
                    <Grid item xs={6} sm={3} md={1.9} key={profile.id}>
                        <Box display="flex" flexDirection="column" alignItems="center" onClick={() => navigate(`/profil/${profile.id}`)} sx={{ cursor: 'pointer' }}>
                            <Avatar
                                src={profile.profileImageUrl}
                                alt={profile.profileImageUrl}
                                sx={{ width: "144px", height: "144px", mb: 1 }}
                            />
                            <Typography variant="body2" textAlign="center">
                                {profile.name}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default DisplayProfiles;
