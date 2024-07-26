import PropTypes from "prop-types";
import {
    Box,
    Card,
    CardContent,
    Divider,
    Grid,
    List,
    Typography,
    useMediaQuery,
    Stack,
} from "@mui/material";
import { useSelector } from "react-redux";
import CartItem from "../Cart/CartItem";
import { Scrollbar } from "../ui/Scrollbar";
import { useMemo, useEffect } from "react";

export const currencyFormatter = new Intl.NumberFormat('en-TN', {
    style: 'currency',
    currency: 'TND',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

const calculateAmounts = (products) => {
    const shippingTax = 7; // Change shipping tax to 7 DT
    const subtotal = products.reduce((acc, product) => {
        return acc + product.price * product.quantity;
    }, 0);
    const total = shippingTax + subtotal;

    return {
        shippingTax,
        subtotal,
        total,
    };
};

const CheckoutSummary = (props) => {
    const { onEditStep, setFieldValue } = props;
    const cart = useSelector((state) => state.cart.cart);
    const isMobileScreen = useMediaQuery((theme) =>
        theme.breakpoints.down("md")
    );
    const billingInfo = JSON.parse(localStorage.getItem("billingInfo"));
    const { shippingTax, subtotal, total } = calculateAmounts(cart);

    const formattedShippingTax = currencyFormatter.format(shippingTax);
    const formattedSubtotal = currencyFormatter.format(subtotal);
    const formattedTotal = currencyFormatter.format(total);

    const extractedFields = useMemo(() => {
        return cart.map((product) => ({
            name: product.name,
            quantity: product.quantity,
            images: product.designImage.map((image) => image._id),
            price: product.price,
            product: product._id,
            sizes: product.selectedSizes || [] // Add sizes information
        }));
    }, [cart]);

    useEffect(() => {
        // setFieldValue("orderItems", extractedFields);
        // setFieldValue("itemsPrice", subtotal);
        // setFieldValue("shippingPrice", shippingTax);
        // setFieldValue("totalPrice", total);
    }, [extractedFields, setFieldValue, subtotal, shippingTax, total]);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <Stack spacing={3}>
                    <List
                        sx={{
                            maxHeight: "800px",
                            overflow: "auto",
                            ...(isMobileScreen && { flexGrow: 1 }),
                        }}
                    >
                        <Scrollbar>
                            {cart.map((product) => (
                                <CartItem
                                    key={product._id}
                                    product={product}
                                    showed={false}
                                    sizes={product.selectedSizes} // Pass sizes to CartItem
                                />
                            ))}
                        </Scrollbar>
                    </List>
                </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
                <Stack spacing={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
                                Order Summary
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="h5">Subtotal</Typography>
                                <Typography variant="h5">{formattedSubtotal}</Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="h5">Shipping Tax</Typography>
                                <Typography variant="h5">{formattedShippingTax}</Typography>
                            </Box>
                            <Divider sx={{ my: 2 }} />
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="h5">Total</Typography>
                                <Typography variant="h5">{formattedTotal}</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Stack>
            </Grid>
        </Grid>
    );
};

CheckoutSummary.propTypes = {
    onEditStep: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func.isRequired,
};

export default CheckoutSummary;
