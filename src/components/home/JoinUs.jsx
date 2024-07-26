import {
    Box, Unstable_Grid2 as Grid,
    TextField, Typography
} from "@mui/material";
import CustomButton from "../ui/CustomButton";
import { Link } from "react-router-dom";

const JoinUs = () => {

    return (
        <Grid container spacing={1} >
            <Grid xs={12}>
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: "600",
                        mb: "10px", textAlign: "center",
                    }}>
                    Subscribe our newsletter to get updates to our latest collections
                </Typography>
            </Grid>
            <Grid xs={12} md={6}>
                <Typography variant="h5" sx={{
                    mb: "15px", fontWeight: "500", textAlign: "center",
                }}>
                    Get 20% off on your first order just by subscribing to our newsletter!
                </Typography>

                /</Grid>
            <Grid
                xs={12}
                md={6}
            >
                <Box sx={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    gap: "3px", mb: "5px"
                }}>
                    <TextField id="outlined-basic" label="Email Address"
                        variant="outlined" size="small"
                        InputLabelProps={{ style: { fontSize: "13px" } }}
                    />
                    <CustomButton >
                        Subscribe
                    </CustomButton>

                </Box>
            </Grid>

        </Grid>


    );
}

export default JoinUs;