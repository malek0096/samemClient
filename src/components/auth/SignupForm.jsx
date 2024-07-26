import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';
import { Link, Grid, Divider, useMediaQuery, Typography } from '@mui/material';
import CustomInput from '../../components/ui/CustomInput';
import CustomButton from '../../components/ui/CustomButton';
import { tokens } from '../../theme/theme';
import useTheme from '../../hooks/useTheme';
import SocialAuth from '../../components/SocialAuth';
import useAuth from '../../hooks/useAuth';
import ChangeAvatar from "../../components/Profil/thumbnail.component";

const SignupForm = () => {
    const { register } = useAuth();
    const { theme } = useTheme();
    const colors = tokens(theme.palette.mode);
    const [serverErrors, setServerErrors] = useState({});
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [profileImage, setProfileImage] = useState(null); // State to hold profile image

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        portfolioLink: '',
        bio: '',
        facebook: '',
        instagram: '',
        linkedin: '',
        profileImage: null, // Initialize profile image in form values
    };

    const validationSchema = Yup.object().shape({
        lastName: Yup.string().required('Name is required'),
        firstName: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .matches(
                /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/,
                'Password should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long'
            ),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required'),
        bio: Yup.string().required('Bio is required'),
        facebook: Yup.string().url('Invalid URL'),
        instagram: Yup.string().url('Invalid URL'),
        linkedin: Yup.string().url('Invalid URL'),
        profileImage: Yup.mixed().test('fileSize', 'Profile image is required', (value) => {
            if (!profileImage) {
                return false;
            }
            return profileImage.size <= 1048576; // Example limit: 1MB
        }),
    });

    const onSubmit = async (values, { setStatus, setSubmitting }) => {


        const formData = new FormData();
        formData.append('email', values.email);
        formData.append('firstName', values.firstName);
        formData.append('lastName', values.lastName);
        formData.append('name', `${values.firstName}-${values.lastName}`);
        formData.append('password', values.password);
        formData.append('bio', values.bio);
        formData.append('facebook', values.facebook);
        formData.append('instagram', values.instagram);
        formData.append('linkedin', values.linkedin);
        formData.append('profileImage', profileImage);

        try {
            await register(formData);
        } catch (error) {
            console.error(error);
            setServerErrors(error);
            setStatus({ success: false });
            setSubmitting(false);
        }
    };

    const handleImageChange = (imageFile) => {
        setProfileImage(imageFile); // Update profileImage state with selected file
        formik.setFieldValue('profileImage', imageFile); // Set profileImage field value in Formik
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
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
            <Typography variant="h2" fontWeight="bold" align="center" marginBottom='20px'>
                <ChangeAvatar image={profileImage} onImageChange={handleImageChange} />
            </Typography>
            {touched.profileImage && errors.profileImage && (
                <Typography variant="subtitle2" color="error" align="center">
                    profile image is required
                </Typography>
            )}
            {isSubmitting && !profileImage && (
                <Typography variant="subtitle2" color="error" align="center">
                    Profile image is required
                </Typography>
            )}
            <Grid container spacing={4} direction={isSmallScreen ? 'column' : 'row'}>
                <Grid item xs={12} md={6}>
                    <CustomInput
                        label="First Name*"
                        placeholder="First Name"
                        type="text"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched?.firstName && !!(errors?.firstName || serverErrors?.firstName)}
                        helperText={touched?.firstName && (errors?.firstName || serverErrors?.firstName)}
                    />
                    <br />
                    <br />
                    <CustomInput
                        label="Last Name*"
                        placeholder="Last Name"
                        type="text"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.lastName && !!(errors.lastName || serverErrors.lastName)}
                        helperText={touched.lastName && (errors.lastName || serverErrors.lastName)}
                    />
                    <br />
                    <br />
                    <CustomInput
                        label="Email*"
                        placeholder="name@example.com"
                        type="text"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && !!(errors.email || serverErrors.email)}
                        helperText={touched.email && (errors.email || serverErrors.email)}
                    />
                    <br />
                    <br />
                    <CustomInput
                        label="Password*"
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.password && !!(errors.password || serverErrors.password)}
                        helperText={touched.password && (errors.password || serverErrors.password)}
                    />
                    <br />
                    <br />
                    <CustomInput
                        label="Confirm Password*"
                        placeholder="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.confirmPassword && !!(errors.confirmPassword || serverErrors.confirmPassword)}
                        helperText={touched.confirmPassword && (errors.confirmPassword || serverErrors.confirmPassword)}
                    />
                </Grid>
                {!isSmallScreen && (
                    <Grid item xs={1}>
                        <Divider orientation="vertical" style={{ height: '100%', width: '1px', backgroundColor: 'black' }} />
                    </Grid>
                )}
                <Grid item xs={12} md={5}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <textarea
                                label="Bio*"
                                placeholder="Bio"
                                name="bio"
                                value={values.bio}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                rows="4"
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderColor: touched.bio && !!(errors.bio || serverErrors.bio) ? 'red' : '',
                                    borderWidth: touched.bio && !!(errors.bio || serverErrors.bio) ? '2px' : '',
                                }}
                            />
                            {touched.bio && (errors.bio || serverErrors.bio) && (
                                <div style={{ color: 'red', fontSize: '12px', marginTop: '8px' }}>{errors.bio || serverErrors.bio}</div>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <h3 style={{ fontWeight: 'bold', marginTop: '16px' }}>URLs</h3>
                        </Grid>
                        <Grid item xs={12}>
                            <CustomInput
                                label="Facebook"
                                placeholder="Facebook"
                                type="text"
                                name="facebook"
                                value={values.facebook}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.facebook && !!(errors.facebook || serverErrors.facebook)}
                                helperText={touched.facebook && (errors.facebook || serverErrors.facebook)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomInput
                                label="Instagram"
                                placeholder="Instagram"
                                type="text"
                                name="instagram"
                                value={values.instagram}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.instagram && !!(errors.instagram || serverErrors.instagram)}
                                helperText={touched.instagram && (errors.instagram || serverErrors.instagram)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomInput
                                label="LinkedIn"
                                placeholder="LinkedIn"
                                type="text"
                                name="linkedin"
                                value={values.linkedin}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.linkedin && !!(errors.linkedin || serverErrors.linkedin)}
                                helperText={touched.linkedin && (errors.linkedin || serverErrors.linkedin)}
                            />
                        </Grid>
                    </Grid>
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
                        }}
                    >
                        {isSubmitting ? 'Signing Up...' : 'Register'}
                    </CustomButton>
                </Grid>
                <Grid item xs={12}>
                    <SocialAuth />
                </Grid>
                <Grid container style={{ marginTop: '10px', display: 'grid', placeItems: 'center' }}>
                    <Link
                        style={{
                            color: colors.grey[100],
                            textDecoration: 'none',
                            '&:hover': {
                                textDecoration: 'underline',
                            },
                        }}
                        to="/signin"
                        variant="h5"
                        component={RouterLink}
                    >
                        {'Already have an account? Sign In'}
                    </Link>
                </Grid>
            </Grid>
        </form>
    );
};

export default SignupForm;
