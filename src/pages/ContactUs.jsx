import { Box, Container, Divider, TextField, Button, Typography, Grid } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { styled } from '@mui/system';
import contactUsImg from '../assets/samem webp/samem webp/Group 16.webp'
import bgImage from '../assets/bg-global.svg'
const ContactContainer = styled(Container)({
    position: 'relative',
    marginBottom: '5rem',
    marginTop: '0rem',
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
});

const ContactForm = styled(Box)({
});

const ContactImage = styled('img')({
    maxWidth: '100%',
    height: 'auto',
    display: 'block',
    margin: '0 auto',
});

const ContactButton = styled(Button)({
    width: '100%',
    marginTop: '1rem',
    backgroundColor: 'black',
    color: 'white',
    '&:hover': {
        backgroundColor: 'darkgrey',
    }
});

function ContactUs() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            const response = await axios.post('/api/v1/contact', { firstName, lastName, email, message });
            if (response.status === 200) {
                setSuccess('Your message has been sent successfully!');
                setFirstName('');
                setLastName('');
                setEmail('');
                setMessage('');
            }
        } catch (error) {
            setError('An error occurred while sending your message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ContactContainer maxWidth='xl'>
            <Box>

                <Grid container spacing={0} sx={{ mt: 3 }}>
                    <Grid item xs={12} ml={6} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <ContactImage src={contactUsImg} alt="Contact Us" />
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <ContactForm component="form" onSubmit={handleSubmit}>
                            <Typography variant="h2" sx={{
                                fontWeight: "bold",
                                fontSize: "44px",
                                fontFamily: "inter"
                            }} gutterBottom>
                                Contact Us
                            </Typography>
                            <Typography variant="subtitle1" sx={{
                                fontSize: "18px",
                                fontFamily: "inter"
                            }} gutterBottom>
                                Tell us about your creative ideas
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="First name"
                                        variant="outlined"
                                        margin="normal"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Last name"
                                        variant="outlined"
                                        margin="normal"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                </Grid>
                            </Grid>
                            <br />
                            <TextField
                                sx={{ height: "11vh" }}
                                fullWidth
                                label="Email address"
                                variant="outlined"
                                margin="normal"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <br />

                            <TextField
                                fullWidth
                                label="Your message"
                                variant="outlined"
                                margin="normal"
                                multiline
                                rows={4}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            />
                            {error && (
                                <Typography color="error" sx={{ mt: 2 }}>
                                    {error}
                                </Typography>
                            )}
                            {success && (
                                <Typography color="success" sx={{ mt: 2 }}>
                                    {success}
                                </Typography>
                            )}
                            <br />
                            <br />

                            <ContactButton
                                type="submit"
                                variant="contained"
                                disabled={loading}
                            >
                                {loading ? 'Sending...' : 'Submit'}
                            </ContactButton>
                        </ContactForm>
                    </Grid>
                </Grid>
            </Box>
        </ContactContainer>
    );
}

export default ContactUs;
