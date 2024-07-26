import * as Yup from 'yup';
import { useFormik } from 'formik';
import CustomButton from "../ui/CustomButton";
import { FormHelperText, Grid, Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { tokens } from "../../theme/theme";
import useTheme from "../../hooks/useTheme";
import CustomInput from "../ui/CustomInput";
import { authApi } from "../../api/authApi";
import PropTypes from 'prop-types';
import forgetPasswordImg from '../../assets/samem webp/samem webp/Reset-Password-2--Streamline-Milano.webp'
import { Box } from '@mui/system';

const initialValues = {
  email: '',
};

const validationSchema = Yup.object({
  email: Yup
    .string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required')
});
const Forgetpassword = (props) => {
  const { onSuccess } = props
  const { theme } = useTheme();
  const colors = tokens(theme.palette.mode);

  const onSubmitHandler = async (
    values,
    { setErrors, setStatus, setSubmitting }
  ) => {
    try {
      const res = await authApi.forgotPassword({ email: values.email });
      if (res.success === true) {
        onSuccess(res.message)
      }
    } catch (err) {
      console.error(err);
      setStatus({ success: false });
      setErrors({ submit: err.message });
      setSubmitting(false);

    }
  }
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onSubmitHandler
  });
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = formik;
  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit}
      >
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Typography variant="h1"> <b>Don’t worry we are here to help you !</b>.</Typography><br />
            <br /><br /><Typography variant="h5">Enter Your <b>Email address</b> that you used to register. We'll
              send you an email with your name and a link to reset your password.</Typography>
            <br></br>
            <Stack spacing={4} alignItems='center'>
              <CustomInput
                required
                error={!!(touched.email && errors.email)}
                fullWidth
                helperText={touched.email && errors.email}
                label="Email Address"
                placeholder="name@example.com"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                type="email"
                value={values.email}
              />
              {errors.submit && (
                <FormHelperText
                  error
                  sx={{ mt: 3 }}
                >
                  {errors.submit}
                </FormHelperText>
              )}
              <CustomButton
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                color='primary'
                variant="contained"
                sx={{
                  mt: 2,
                  '@media (min-width: 600px)': {
                    width: '100%',
                  },
                  padding: '15px',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                  bgcolor: theme.palette.mode === 'dark' ? 'primary.dark' : 'primary.main', // Adjust for dark mode

                }}

              >
                {isSubmitting ? "loading..." : "Send reset link"}
              </CustomButton>
              <Link
                component={RouterLink}
                style={{
                  color: colors.grey[100], textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  }
                }}
                to="/signin"
                variant="h5"
              >
                {"Remember your password?"}
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h2" fontWeight="bold" align="center" marginBottom='20px'>
              <Box
                component="img"
                sx={{
                  height: "100%", // Adjusted to cover full height
                  width: "100%",  // Adjusted to cover full width
                  objectFit: "cover", // Ensures the image covers the entire box
                  maxHeight: { xs: "100%", md: "100%" },
                  maxWidth: { xs: "85%", md: "85%" },
                }}
                alt="The forget password image."
                src={forgetPasswordImg || ''}
              />
            </Typography>
          </Grid>

        </Grid>
      </form>


    </>
  )
}
Forgetpassword.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};
export default Forgetpassword