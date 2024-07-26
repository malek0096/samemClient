import { useSelector } from "react-redux";
import { Box, Grid, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { checkoutInitialValues, checkoutSchema } from "../../components/checkout/CheckoutFormValidation";
import CustomButton from "../../components/ui/CustomButton";
import ContactInfo from "../../components/checkout/ContactInfo";
import { toast } from "react-hot-toast";
import { useMounted } from "../../hooks/use-mounted";
import { orderApi } from "../../api/orderApi";
import { useNavigate } from "react-router-dom";
import CheckoutSummary from "../../components/checkout/CheckoutSummary"

import { useDispatch } from "react-redux";
import { clearCart } from "../../app/feature/cartSlice";

const Checkout = () => {
    const isMounted = useMounted();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const [activeStep, setActiveStep] = useState(0);
    const isLastStep = activeStep === 3;

    const handleFormSubmit = async (values, actions) => {
        values.status = "PENDING";
        const { fullName, email, postcode, phoneNumber, status } = values;
        const cartItems = JSON.parse(localStorage.getItem("cartItems"));

        // Add sizes to each item in the cart
        const cartItemsWithSizes = cartItems.map(item => {
            const sizes = JSON.parse(localStorage.getItem(`selectedSizes_${item._id}`)) || [];
            return { ...item, sizes };
        });

        console.log({ cartItemsWithSizes });

        const orderPayload = { fullName, email, postcode, phoneNumber, status, cartItems: cartItemsWithSizes };

        try {
            const response = await orderApi.CreateOrder(orderPayload);
            if (isMounted()) {
                actions.setStatus({ success: true });
                actions.setSubmitting(false);
                localStorage.removeItem('cartItems');
                localStorage.removeItem('billingInfo');
                toast.success('Order Created');
                actions.setTouched({});
                dispatch(clearCart());
                navigate(`/`);
            }
        } catch (error) {
            if (isMounted()) {
                toast.error(error.message);
                actions.setStatus({ success: false });
                actions.setErrors(error);
                actions.setSubmitting(false);
            }
        }

        actions.setTouched({});
    };


    const formik = useFormik({
        onSubmit: handleFormSubmit,
        initialValues: JSON.parse(localStorage.getItem("billingInfo", "cartItems")) || checkoutInitialValues,
        validationSchema: checkoutSchema[activeStep]
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
        <Box width="80%" m="100px auto">
            <Box>
                <form onSubmit={handleSubmit} noValidate>
                    <CheckoutSummary
                    // setFieldValue={formik.setFieldValue}
                    // onEditStep={handleEditStep}
                    />
                    <ContactInfo
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                    />
                    <Grid container spacing={0} justifyContent="center">
                        <Grid item xs={12} md={8}>
                            <CustomButton
                                fullWidth="true"
                                type="submit"
                                color="primary"
                                disabled={isSubmitting}
                                variant="contained"
                                sx={{
                                    boxShadow: "none",
                                    borderRadius: 0,
                                    padding: "15px 40px",
                                }}
                            >
                                {isSubmitting ? "loading..." : "Place Order"}
                            </CustomButton>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Box>
    );
};

export default Checkout;


