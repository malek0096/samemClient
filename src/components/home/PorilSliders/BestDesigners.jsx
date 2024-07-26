import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { profilApi } from '../../../api/profilApi';

const designerss = [
    { id: "669443bd4a3839328c36cf4f", name: "Imed", image: "path/to/image1.jpg" },
    { id: "2", name: "Anissa", image: "path/to/image2.jpg" },
    { id: "3", name: "Anis", image: "path/to/image3.jpg" },
    { id: "4", name: "Najiba", image: "path/to/image4.jpg" },
    { id: "5", name: "Moufida", image: "path/to/image5.jpg" },
    { id: "6", name: "Farid", image: "path/to/image6.jpg" },
    { id: "7", name: "Farid", image: "path/to/image7.jpg" },
];
const BestDesigners = () => {
    const navigate = useNavigate();
    const [designers, setDesigners] = useState([]);

    useEffect(() => {
        const fetchDesigners = async () => {
            try {
                const response = await profilApi.getProfiles();
                setDesigners(response);
            } catch (error) {
                console.error("Failed to fetch designers", error);
            }
        };

        fetchDesigners();
    }, []);
    const handleProfileClick = (id) => {
        navigate(`/profil/${id}`);
    };

    return (
        <Box width="80%" margin="40px auto">
            <Typography variant="h5" fontWeight="bold" mb={2}>
                Best Designers
            </Typography>
            <Box display="flex" alignItems="center" overflow="auto">
                {designers.slice(0, 8).map((designer) => (
                    <Box
                        key={designer.id}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        mx={1}
                        onClick={() => handleProfileClick(designer.id)}
                        sx={{ cursor: 'pointer' }}
                    >
                        <Avatar
                            src={designer?.profileImageUrl}
                            alt={designer.name}
                            sx={{ width: 100, height: 100 }}
                        />
                        <Typography variant="body1" mt={1}>
                            {designer.name}
                        </Typography>
                    </Box>
                ))}
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    mx={1}
                    justifyContent="center"
                >
                    <Avatar
                        sx={{
                            marginTop: "-1rem",
                            width: 100,
                            height: 100,
                            backgroundColor: "black",
                            color: "white",
                            cursor: "pointer"
                        }}
                        onClick={() => navigate("/designers")}
                    >
                        See all →
                    </Avatar>
                </Box>
            </Box>
        </Box>
    );
};

export default BestDesigners;
