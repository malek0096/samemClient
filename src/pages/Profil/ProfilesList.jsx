import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper } from "@mui/material";
import { styled } from "@mui/system";
import bgImage from '../../assets/bg-global.svg';
import DisplayProfiles from "../../components/Profil/profilList.component";
import MousamemProgram from "../../components/ContentPage.component";
import { profilApi } from '../../api/profilApi';

const CenteredContainer = styled("div")({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundImage: `url(${bgImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
});

const CustomPaper = styled(Paper)({
    width: "100%",
    padding: "20px",
    border: "none",
    boxShadow: "none",
    backgroundColor: "rgba(255, 255, 255, 0)",
});

const Profillist = () => {
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                // Replace this with your actual API call to fetch profiles
                const response = await profilApi.getProfiles();
                setProfiles(response); // Assuming response.data is an array of profiles
            } catch (error) {
                console.error("Failed to fetch profiles", error);
            }
        };

        fetchProfiles();
    }, []);

    return (
        <CenteredContainer>
            <CustomPaper>
                <Box width="100%" m="30px auto">
                    <DisplayProfiles profiles={profiles} />
                    <MousamemProgram />
                </Box>
            </CustomPaper>
        </CenteredContainer>
    );
};

export default Profillist;
