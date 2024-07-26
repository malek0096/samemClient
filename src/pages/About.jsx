import React from 'react';
import { Box, Container, Typography, Grid } from "@mui/material";
import { styled } from '@mui/system';
import logoSvg from '../assets/animations/Group 427319094.gif';
import companyImg from '../assets/samem webp/samem webp/WhatsApp_Image_2024-06-24_at_23.19.37_f746a79e-removebg-preview.webp';
import supportingImg from '../assets/samem webp/samem webp/Group.webp';
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
const Image = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

const ContentBox = styled(Box)({
    margin: '2rem 0',
    textAlign: 'center'
});

const Title = styled(Typography)({
    fontWeight: 'bolder',
    fontSize: "40px",

});

const SubTitle = styled(Typography)({
    marginBottom: '1rem',
    fontSize: "18px"

});

const Section = styled(Container)({
    marginTop: '4rem',
    textAlign: 'left',
});

const SectionTitle = styled(Typography)({
    fontWeight: 'bold',
    marginBottom: '1rem',
    fontSize: "44px"
});

const ImageBox = styled(Box)({
    width: '100%',
    height: '300px', // Set a fixed height for the image box
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
});

const About = () => {
    return (
        <PageContainer maxWidth='xl'>
            <Box textAlign="center" mb={4}>
                <img src={logoSvg} alt="Logo" style={{ width: '300px', marginBottom: '-5rem' }} />
            </Box>
            <Section>
                <Grid container >
                    <Grid item xs={12} md={12}>
                        <Box>
                            <Title variant="h4" gutterBottom>
                                What is Samem?
                            </Title>
                            <Typography variant="body1" gutterBottom>
                                Samem, derived from the Arabic word "تصميم" meaning "design," is our latest initiative aimed at supporting and showcasing the incredible talents of local designers.
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Our platform enables designers to effortlessly sell their artwork on high-quality apparel, such as T-shirts, without worrying about logistics, customer service, or shipping.
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                We handle all the behind-the-scenes work, allowing designers to focus on what they do best: creating inspiring designs.
                            </Typography>
                        </Box>
                    </Grid>

                </Grid>
            </Section>
            <Section>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <ImageBox>
                            <Image src={companyImg} alt="What is Samem?" style={{ width: '80%', height: 'auto' }} />
                        </ImageBox>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box>
                            <SectionTitle variant="h4" gutterBottom>
                                Our company
                            </SectionTitle>
                            <SubTitle variant="h6" gutterBottom>
                                Dallali Digital Innovation Group
                            </SubTitle>
                            <Typography variant="body1" gutterBottom>
                                Dallali Digital Innovation Group is committed to fostering creativity and innovation in the digital space.
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Our mission is to create platforms that empower local talents and provide them with the tools they need to succeed.
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                With a focus on quality, community, and innovation, we strive to make a meaningful impact in the lives of designers and the customers who appreciate their work.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Section>
            <Section>
                <Grid container spacing={2}>

                    <Grid item xs={12} md={6}>
                        <Box>
                            <SectionTitle variant="h4" gutterBottom>
                                Supporting Talents
                            </SectionTitle>
                            <SubTitle variant="h6" gutterBottom>
                                Hassle-free platform to sell artwork.
                            </SubTitle>
                            <Typography variant="body1" gutterBottom>
                                At Samem, we empower local designers by providing a hassle-free platform to sell their artwork on high-quality apparel.
                                We handle printing, shipping, and customer service, ensuring designers can focus on their creativity.
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                With fair compensation and comprehensive sales insights, we help designers thrive and succeed in the market.
                                Join us to turn your passion into profit and be part of a vibrant creative community.
                            </Typography>

                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ImageBox>
                            <Image src={supportingImg} alt="What is Samem?" style={{ width: '80%', height: 'auto' }} />
                        </ImageBox>
                    </Grid>
                </Grid>
            </Section>
        </PageContainer>
    );
}

export default About;
