import {
    Grid,
    Link,
    Typography,
    Avatar,
    IconButton,
    Paper,
} from "@mui/material";
import { Instagram, Facebook, LinkedIn } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProfil } from "../../hooks/useProfil";
import Splash from "../../components/ui/Splash";
import { Box, styled } from "@mui/system";
import { profilApi } from "../../api/profilApi";
import { productApi } from "../../api/productApi";
import fakeImg from "../../assets/samem webp/samem webp/Site-Builder-1--Streamline-Milano.webp";
import ProductCard from "../../components/Product/ProductCard";
import bgImage from "../../assets/bg-global.svg";

const SharedProfil = () => {
    const { desginerId } = useParams();
    const user = useProfil(desginerId);
    const [selectedImage, setSelectedImage] = useState("");
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            productApi.GetProducts(user._id).then((response) => {
                setProducts(response);
            }).catch((error) => {
                console.error("Failed to fetch products", error);
            });
        }
    }, [user]);

    if (!user) {
        return <Splash />;
    }
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
    console.log('products lenght', products.length)
    return (
        <CenteredContainer>
            <CustomPaper>
                <Box width="60%" m="30px auto">
                    <Box display="flex" alignItems="center" flexDirection={{ xs: 'column', sm: 'row', md: 'row' }} mb={4}>
                        <Avatar
                            src={user?.profileImage || fakeImg}
                            alt={user?.name}
                            sx={{ width: 233, height: 233, mr: { xs: 0, sm: 2 } }} // Adjust margin for spacing
                        />
                        <Box flex={1} mt={{ xs: 2, sm: 0 }} ml={{ xs: 0, sm: 2 }} textAlign={{ xs: 'center', sm: 'left' }}>
                            <Box
                                display="flex"
                                justifyContent={{ xs: 'center', sm: 'space-between' }}
                                alignItems="center"
                                flexDirection={{ xs: 'column', sm: 'row' }}
                                width="100%"
                            >
                                <Typography variant="h4" fontWeight="bold" sx={{ mr: 2 }}>
                                    {`${user?.firstName} ${user?.lastName}` || "username"}
                                </Typography>
                                <Box display="flex" mt={{ xs: 2, sm: 0 }} ml={{ xs: 0, sm: 2 }}>
                                    <IconButton
                                        component="a"
                                        href={user?.instagram}
                                        target="_blank"
                                        rel="noopener"
                                        aria-label="Instagram"
                                        sx={{ mr: 1 }}
                                    >
                                        <Instagram />
                                    </IconButton>
                                    <IconButton
                                        component="a"
                                        href={user?.facebook}
                                        target="_blank"
                                        rel="noopener"
                                        aria-label="Facebook"
                                        sx={{ mr: 1 }}
                                    >
                                        <Facebook />
                                    </IconButton>
                                    <IconButton
                                        component="a"
                                        href={user?.linkedin}
                                        target="_blank"
                                        rel="noopener"
                                        aria-label="linkedin"
                                    >
                                        <LinkedIn />
                                    </IconButton>
                                </Box>
                            </Box>
                            <Typography width={{ xs: '100%', sm: '100%' }} variant="body1" color="textSecondary" mt={2}>
                                {user?.bio ||
                                    "This is the description that the designer chooses to write on his profile, it can be a bio or maybe some funny words or quotes or even a definition about himself"}
                            </Typography>
                        </Box>
                    </Box>





                    <Box mt="50px" width="100%">
                        <Typography variant="h3" fontWeight="bold">
                            my Design
                        </Typography>
                        <Box
                            margin="0 auto"
                            display="grid"
                            gridTemplateColumns="repeat(auto-fill, 300px)"
                            justifyContent="space-around"
                            rowGap="20px"
                            columnGap="1.33%"
                        >
                            {products.length && products?.map((item, i) => (
                                <ProductCard
                                    key={`${item.name}-${i}`}
                                    product={{
                                        ...item,
                                        images: item.designImageUrls || item.designImage.map(img => img.url)
                                    }}
                                />
                            ))}
                        </Box>
                    </Box>
                </Box>
            </CustomPaper>
        </CenteredContainer>
    );
};

export default SharedProfil;
