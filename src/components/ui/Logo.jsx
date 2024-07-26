
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import logoSvg from '../../assets/logo.png'
import { Box } from "@mui/system";
function Logo() {
    return (
        <Typography variant="h2" fontWeight="bold" align="center" marginBottom='20px'>
            <Box
                component="img"
                sx={{
                    marginTop: "1rem",
                    height: 60,
                    width: "fit",
                    maxHeight: { xs: 130, md: 130 },
                    maxWidth: { xs: 180, md: 180 },
                }}
                alt="The logo."
                src={logoSvg || ''}
            />
        </Typography>
    );
}

export default Logo;  