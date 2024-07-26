import React from "react";
import { Box, Container, Typography, Grid, Button } from "@mui/material";
import { border, borderRadius, styled } from "@mui/system";
import logoSvg from "../assets/samem webp/samem webp/logoSvg.webp";
import mosamemImg from "../assets/samem webp/samem webp/xxdd.webp";
import mosamemImgText from "../assets/animations/Group 26.gif";
import getPaidImg from "../assets/samem webp/samem webp/cashback-with-every-purchase--e-commerce-cashback-with-every-purchase.webp";
import joinImg from "../assets/samem webp/samem webp/same-day-delivery--e-commerce-same-day-delivery.webp";
import bgImage from '../assets/bg-global.svg'
const PageContainer = styled(Container)(({ theme }) => ({
    position: 'relative',
    marginBottom: '5rem',
    marginTop: '2rem',
    fontFamily: 'Inter',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        opacity: 0.3,
    },
}));


const Image = styled("img")({
    width: "100%",
    height: "100%",
    objectFit: "contain",
});

const ContentBox = styled(Box)({
    margin: "2rem 0",
    textAlign: "center",
});

const Title = styled(Typography)({
    fontWeight: "bold",
    fontsize: "64px",
});

const SubTitle = styled(Typography)({
    marginBottom: "1rem",
    fontWeight: '300',
});

const Section = styled(Container)({
    marginTop: "0rem",
    textAlign: "left",
});

const SectionTitle = styled(Typography)({
    fontWeight: "bold",
    marginBottom: "1rem",
    fontSize: "44px",
    fontFamily: 'Inter',

});

const ImageBox = styled(Box)({
    width: "100%",
    height: "50vh", // Set a fixed height for the image box
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
});

const StyledButton = styled(Button)({
    marginTop: '1rem',
    padding: '0.5rem 2rem',
    backgroundColor: 'black',
    color: 'white',
    '&:hover': {
        backgroundColor: '"white',
        color: 'black',
        border: "1px solid black",
        borderRadius: "14px"

    },
});

const MosamemProgram = () => {
    return (
        <PageContainer maxWidth="xl">
            <Box textAlign="center" mb={4}>
                <img src={mosamemImgText} alt="Description of your image" style={{ width: '80vw', maxWidth: '90vw' }} />
            </Box>

            <Section>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <ImageBox>
                            <Image src={mosamemImg} alt="What is Samem?" />
                        </ImageBox>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box>
                            <SectionTitle variant="h4" gutterBottom>
                                Mousamem Program
                            </SectionTitle>
                            <SubTitle variant="h6" gutterBottom>
                                Unleash Your Creativity with the Mousamem Program
                            </SubTitle>
                            <Typography variant="body1" gutterBottom>
                                Are you a designer with a passion for creating unique and
                                inspiring artwork?
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Join the Mousamem Program at Samem and turn your creativity into
                                a rewarding career!
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Our platform offers everything you need to start selling your
                                designs on high-quality apparel and get paid for every unit
                                sold.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Section>

            <Section>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={5} order={{ xs: 2, md: 1 }}>
                        <Box>
                            <SectionTitle variant="h4" gutterBottom>
                                Why Join Mousamem?
                            </SectionTitle>
                            <SubTitle variant="h6" gutterBottom>
                                Effortless selling allows you to focus on your art while we
                                handle printing, shipping, and customer service.
                            </SubTitle>
                            <Typography variant="body1" gutterBottom>
                                You decide how much you want to earn for every item sold,
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                ensuring you get the compensation you deserve. Our
                                comprehensive dashboard provides valuable insights into your
                                sales, market trends, and customer preferences, helping you
                                refine your designs and increase your success.
                            </Typography>

                        </Box>
                    </Grid>
                    <Grid item xs={12} md={7} order={{ xs: 1, md: 2 }}>
                        <ImageBox>
                            <Image src={joinImg} alt="Our company" />
                        </ImageBox>
                    </Grid>
                </Grid>
            </Section>

            <Section>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <ImageBox>
                            <Image src={getPaidImg} alt="Supporting Talents" />
                        </ImageBox>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box>
                            <SectionTitle variant="h4" gutterBottom>
                                Get paid
                            </SectionTitle>
                            <SubTitle variant="h6" gutterBottom>
                                Samem invests in your talent
                            </SubTitle>
                            <Typography variant="body1" gutterBottom>
                                At Samem, we believe in rewarding creativity. Designers have the
                                flexibility to set their own profit margins for each T-shirt
                                sold with their design.
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Once a design is uploaded and a sale is made, we handle all the
                                logistics—from printing to shipping—ensuring a seamless process.
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Designers can easily track their earnings through our
                                comprehensive dashboard and receive regular payouts, allowing
                                them to focus on creating amazing designs while we take care of
                                the rest.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Grid>
                    <Box sx={{ border: "0px solid black", display: "flex", justifyContent: "center" }}>
                        <StyledButton variant="contained" href="/signin">
                            Samem
                            Now
                        </StyledButton>
                    </Box>
                </Grid>

            </Section>
        </PageContainer>
    );
};

export default MosamemProgram;
