import { Box, Grid, Link, Typography } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import Logo from "../components/ui/Logo";

const ShopFooter = () => {
    return (
        <Grid container spacing={4} sx={{
            margin: "2rem",
            justifyContent: 'center',
            alignItems: 'center',
            width: "90%"
        }}>
            <Grid item xs={12} md={2} sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
            }}>
                <Box>
                    <Logo />
                    <Box sx={{ mt: "10px" }}>
                        <Box display='flex' alignItems='center' gap='10px'>
                            <FacebookIcon />
                            <InstagramIcon />
                            <LinkedInIcon />
                        </Box>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-between',
                marginBottom: { xs: '2rem', md: '0' }, // Adjust margin bottom for responsiveness
            }}>
                {/* First column */}
                <Box sx={{
                    display: 'flex', flexDirection: 'column', gap: '9px',
                    textAlign: { xs: 'center', md: 'left' }, // Center text on small screens
                }}>
                    <Typography variant="h3" fontWeight={600}
                        sx={{ cursor: "pointer", fontSize: { xs: "11px", md: "13px" } }}
                    >
                        <Link href="/samem-shop" color="inherit" underline="none">
                            Samem Shop
                        </Link>
                    </Typography>
                    <Typography variant="body2" fontWeight={600}
                        sx={{ cursor: "pointer", fontSize: { xs: "11px", md: "13px" } }}
                    >
                        <Link href="/t-shirts" color="inherit" underline="none">
                            T-shirts
                        </Link>
                    </Typography>
                    <Typography variant="body2" fontWeight={600}
                        sx={{ cursor: "pointer", fontSize: { xs: "11px", md: "13px" } }}
                    >
                        <Link href="/best-sellings" color="inherit" underline="none">
                            Best Sellings
                        </Link>
                    </Typography>
                    <Typography variant="body2" fontWeight={600}
                        sx={{ cursor: "pointer", fontSize: { xs: "11px", md: "13px" } }}
                    >
                        <Link href="/top-designers" color="inherit" underline="none">
                            Top Designers
                        </Link>
                    </Typography>
                </Box>

                {/* Second column */}
                <Box sx={{
                    display: 'flex', flexDirection: 'column', gap: '9px',
                    textAlign: { xs: 'center', md: 'left' }, // Center text on small screens
                }}>
                    <Typography variant="h3" fontWeight={600}
                        sx={{ cursor: "pointer", fontSize: { xs: "11px", md: "13px" } }}
                    >
                        <Link href="/mousamem-program" color="inherit" underline="none">
                            Mousamem Program
                        </Link>
                    </Typography>
                    <Typography variant="body2" fontWeight={600}
                        sx={{ cursor: "pointer", fontSize: { xs: "11px", md: "13px" } }}
                    >
                        <Link href="/login" color="inherit" underline="none">
                            Login
                        </Link>
                    </Typography>
                    <Typography variant="body2" fontWeight={600}
                        sx={{ cursor: "pointer", fontSize: { xs: "11px", md: "13px" } }}
                    >
                        <Link href="/create-account" color="inherit" underline="none">
                            Create Account
                        </Link>
                    </Typography>
                    <Typography variant="body2" fontWeight={600}
                        sx={{ cursor: "pointer", fontSize: { xs: "11px", md: "13px" } }}
                    >
                        <Link href="/contact-us" color="inherit" underline="none">
                            Contact Us
                        </Link>
                    </Typography>
                </Box>

                {/* Third column */}
                <Box sx={{
                    display: 'flex', flexDirection: 'column', gap: '9px',
                    textAlign: { xs: 'center', md: 'left' }, // Center text on small screens
                }}>
                    <Typography variant="h3" fontWeight={600}
                        sx={{ cursor: "pointer", fontSize: { xs: "11px", md: "14px" } }}
                    >
                        Social
                    </Typography>
                    <Typography variant="body2" fontWeight={600}
                        sx={{ cursor: "pointer", fontSize: { xs: "11px", md: "14px" } }}
                    >
                        <Link href="https://www.facebook.com" target="_blank" color="inherit" underline="none">
                            Facebook
                        </Link>
                    </Typography>
                    <Typography variant="body2" fontWeight={600}
                        sx={{ cursor: "pointer", fontSize: { xs: "11px", md: "14px" } }}
                    >
                        <Link href="https://www.linkedin.com" target="_blank" color="inherit" underline="none">
                            LinkedIn
                        </Link>
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={12}>
                {/* Remove divider for small and medium screens */}
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '1rem' }}>
                    <Typography variant="body2" sx={{ fontSize: '18px', textAlign: 'center' }}>
                        Copyright &copy; 2024 Dallali Digital Innovation Group SARL - All Rights Reserved
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
}

export default ShopFooter;
