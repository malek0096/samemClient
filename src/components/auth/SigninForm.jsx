import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../ui/CustomInput";
import { Link, Grid } from "@mui/material";
import CustomButton from "../ui/CustomButton";
import useAuth from '../../hooks/useAuth';
import { tokens } from "../../theme/theme";
import useTheme from "../../hooks/useTheme";
import SocialAuth from "../SocialAuth";

const SigninForm = () => {
  const { login } = useAuth();
  const { theme } = useTheme();
  const colors = tokens(theme.palette.mode);
  const [serverErrors, setServerErrors] = useState({});

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmitHandler = async (values, { setStatus, setSubmitting }) => {
    try {
      const response = await login(values.email, values.password);

      console.log('response', response);
    } catch (error) {
      console.error(error);
      setServerErrors(error);
      setStatus({ success: false });
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onSubmitHandler,
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
    <form onSubmit={handleSubmit} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomInput
            required
            label="Email"
            placeholder="name@example.com"
            type="text"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && errors.email}
            helperText={touched.email && (errors.email || serverErrors.email)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <CustomInput
            required
            label="Password"
            placeholder="password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && errors.password}
            helperText={touched.password && (errors.password || serverErrors.password)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <CustomButton
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSubmitting}
            fullWidth
            size="large"
            sx={{
              bgcolor: theme.palette.mode === 'dark' ? 'primary.dark' : 'primary.main',
              mt: 2, // Adjust margin top for spacing
            }}
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </CustomButton>
        </Grid>
        <Grid item xs={12}>
          <SocialAuth />
        </Grid>
        <Grid container justifyContent="space-between" alignItems="center" spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} md="auto">
            <Link
              component={RouterLink}
              to="/forgotpassword"
              variant="body1"
              sx={{
                color: colors.grey[100],
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                }
              }}
            >
              Forgot password?
            </Link>
          </Grid>
          <Grid item xs={12} md="auto">
            <Link
              component={RouterLink}
              to="/signup"
              variant="body1"
              sx={{
                color: colors.grey[100],
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                }
              }}
            >
              If you don't have an account yet
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default SigninForm;
