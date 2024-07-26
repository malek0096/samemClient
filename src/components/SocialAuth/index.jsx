import { Alert, Unstable_Grid2 as Grid } from "@mui/material";
import GoogleAuth from "./GoogleAuth"
import FacebookAuth from "./FacebookAuth"

const SocialAuth = () => {
    return (
        <Grid
            style={{ pointerEvents: 'none', filter: 'grayscale(100%)' }}
            container
            spacing={1}>
            <Grid
                xs={12}
            >
                <Alert severity="error">
                    <div style={{ fontSize: '14px' }}>
                        To register as a samem team member: <br />
                    </div>

                </Alert>
            </Grid>
            <Grid
                xs={12}
            >
                <GoogleAuth />
            </Grid>
            <Grid
                xs={12}
            >
                <FacebookAuth />
            </Grid>
        </Grid>
    )
}

export default SocialAuth