import PropTypes from "prop-types";
import { Box, Typography, Grid, Stack } from "@mui/material";
import CustomInput from "../ui/CustomInput";

const ContactInfo = (props) => {
    const { values, touched, errors, handleBlur, handleChange } = props;

    return (
        <Box m="30px 0">
            <Stack spacing={2}>
                <Typography variant="h4">Contact Info</Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <CustomInput
                            required
                            fullWidth
                            type="text"
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={!!touched.email && !!errors.email}
                            helperText={touched.email && errors.email}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustomInput
                            required
                            fullWidth
                            type="number"
                            label="Phone Number"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.phoneNumber}
                            name="phoneNumber"
                            error={!!touched.phoneNumber && !!errors.phoneNumber}
                            helperText={touched.phoneNumber && errors.phoneNumber}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustomInput
                            required
                            fullWidth
                            type="text"
                            label="Full Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.fullName}
                            name="fullName"
                            error={!!touched.fullName && !!errors.fullName}
                            helperText={touched.fullName && errors.fullName}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustomInput
                            required
                            fullWidth
                            type="text"
                            label="Region"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.region}
                            name="region"
                            error={!!touched.region && !!errors.region}
                            helperText={touched.region && errors.region}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustomInput
                            required
                            fullWidth
                            type="number"
                            label="Postcode"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.postcode}
                            name="postcode"
                            error={!!touched.postcode && !!errors.postcode}
                            helperText={touched.postcode && errors.postcode}
                        />
                    </Grid>
                </Grid>
            </Stack>
        </Box>
    );
};

ContactInfo.propTypes = {
    values: PropTypes.shape({
        email: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string.isRequired,
        fullName: PropTypes.string.isRequired,
        region: PropTypes.string.isRequired,
        postcode: PropTypes.string.isRequired,
    }).isRequired,
    touched: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default ContactInfo;
