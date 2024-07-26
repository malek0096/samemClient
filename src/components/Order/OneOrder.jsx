import {
    Alert,
    Box,
    Card,
    CardContent,
    Divider,
    Unstable_Grid2 as Grid,
    List,
    Stack,
    Typography,
    useMediaQuery,
    Button
} from '@mui/material';
import { Scrollbar } from '../ui/Scrollbar';
import PropTypes from 'prop-types';
import OrderItems from './OrderItem';
import { currencyFormatter } from "../../utils/currencyFormatter";
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { orderApi } from '../../api/orderApi';
import { formatDate } from '../../utils/dateFormatter';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useLocation, useNavigate } from 'react-router-dom';

const OneOrder = (props) => {
    const { data } = props;
    const navigate = useNavigate();
    const isMobileScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const [order, setOrder] = useState(data);
    const [clientSecret, setClientSecret] = useState("");

    const location = useLocation();
    const { prevPath } = location.state || {};

    useEffect(() => {
        if (order) {
            const fetchClientSecret = async () => {
                const totalPriceCents = Math.round(order.totalPrice * 100);
                setClientSecret(clientSecret);
            };
            fetchClientSecret();
        }
    }, [order]);

    const payOrder = async (id, details) => {
        try {
            const response = await orderApi.PayOrder(id, details);
            toast.success('Order is paid');
            setOrder(response);
        } catch (err) {
            toast.error(err);
        }
    };

    useEffect(() => {
        setOrder(data);
    }, [data]);

    const DeleteOrder = async () => {
        try {
            await orderApi.DeleteOrder(order?._id);
            toast.success('Order is deleted');
            navigate('/OrderHistory');
        } catch (err) {
            toast.error(err);
        }
    };

    const downloadPDF = async () => {
        const doc = new jsPDF();
        const imagePromises = order.cartItems.map(async (item) => {
            if (item.imageUrl) {
                const response = await fetch(item.imageUrl);
                const blob = await response.blob();
                return URL.createObjectURL(blob);
            }
            return null;
        });

        const imageUrls = await Promise.all(imagePromises);

        // Page 1: Order Details
        doc.setFontSize(18);
        doc.text('Order Details', 10, 10);
        doc.setFontSize(14);
        doc.text(`Full Name: ${order.fullName}`, 10, 20);
        doc.text(`Email: ${order.email}`, 10, 30);
        doc.text(`Postcode: ${order.postcode}`, 10, 40);
        doc.text(`Phone Number: ${order.phoneNumber}`, 10, 50);
        doc.text(`Order Total: ${currencyFormatter.format(order.totalPrice)}`, 10, 60);
        doc.text(`Payment Method: ${order.paymentMethod}`, 10, 70);
        doc.text(`Shipping Address: ${order.address}`, 10, 80);

        // Add product details with images
        const yOffset = 90;
        order.cartItems.forEach((item, index) => {
            const imgUrl = item.designImage[0].url
            console.log({ imgUrl });
            if (imgUrl) {
                const img = new Image();
                img.src = imgUrl;
                doc.addImage(img, 'JPEG', 10, yOffset + (index * 80), 50, 66.66); // Adjust size and position as needed
            }
            doc.text(`Product: ${item.name}`, 70, yOffset + (index * 80) + 10);
            doc.text(`Quantity: ${item.quantity}`, 70, yOffset + (index * 80) + 25);
            doc.text(`Price: ${currencyFormatter.format(item.price)}`, 70, yOffset + (index * 80) + 50);
        });

        doc.autoTable({
            startY: yOffset + (order.cartItems.length * 60) + 30,
            head: [['Product', 'Quantity', 'Price']],
            body: order.cartItems.map(item => [item.name, item.quantity, currencyFormatter.format(item.price)]),
        });

        // Add a new page for the additional information
        doc.addPage();
        doc.setFontSize(18);
        doc.text('Additional Information', 10, 10);
        doc.setFontSize(14);
        doc.text(`Username: ${order.username || 'N/A'}`, 10, 20);
        doc.text(`Email: ${order.email}`, 10, 30);
        doc.text(`Phone Number: ${order.phoneNumber}`, 10, 40);
        doc.text(`Postcode: ${order.postcode}`, 10, 50);
        doc.text('Delivered by: samem.com', 10, 60);

        doc.save('order-details.pdf');
    };


    return (
        <Grid container spacing={3} sx={{ marginBottom: 2 }}>
            <Grid xs={12} md={8}>
                <Stack spacing={3}>
                    <Card>
                        <CardContent>
                            <Stack spacing={1} sx={{ marginBottom: 2 }}>
                                <Typography variant="h4" fontWeight="700">
                                    Shipping Address :
                                </Typography>
                                <Box>
                                    <Typography variant="h5" fontWeight="600">Full Name:</Typography>
                                    <Typography variant="subtitle1">
                                        {order?.fullName}
                                    </Typography>
                                    <Typography variant="h5" fontWeight="600">Infos:</Typography>
                                    <Typography variant="subtitle1">{`${order?.postcode} ${order?.email} ${order?.phoneNumber}`}</Typography>
                                    <br />
                                </Box>
                                {
                                    order.isDelivered ?
                                        (
                                            <Alert severity="success" style={{ fontSize: "17px" }}>{`Delivered at ${formatDate(order?.deliveredAt)}`}</Alert>
                                        ) : (
                                            <Alert severity="error" style={{ fontSize: "17px" }}>Still Not Delivered Yet</Alert>
                                        )
                                }
                            </Stack>
                            <Stack spacing={1}>
                                <Typography variant="h4" fontWeight="700">
                                    Payment :
                                </Typography>
                                <Box>
                                    <Typography variant="h5" fontWeight="600">
                                        Payment Method:
                                    </Typography>
                                    <Typography variant="subtitle1">{order.paymentMethod}</Typography>
                                </Box>
                                {
                                    order.isPaid ?
                                        (
                                            <Alert severity="success" style={{ fontSize: "17px" }}>{`Paid at ${formatDate(order?.paidAt)}`}</Alert>
                                        ) : (
                                            <Alert severity="error" style={{ fontSize: "17px" }}>Still Not Paid Yet</Alert>
                                        )
                                }
                            </Stack>

                            <List
                                sx={{
                                    maxHeight: '800px',
                                    overflow: 'auto',
                                    ...(isMobileScreen && { flexGrow: 1 }),
                                }}
                            >
                                <Scrollbar>
                                    {order?.cartItems?.map((product) => (
                                        <OrderItems key={product._id} product={product} />
                                    ))}
                                </Scrollbar>
                            </List>
                        </CardContent>
                    </Card>
                </Stack>
            </Grid>
            <Grid xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
                            Order Summary
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h5">Subtotal</Typography>
                            <Typography variant="h5">{currencyFormatter.format(order.itemsPrice)}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h5">Shipping Tax</Typography>
                            <Typography variant="h5">{currencyFormatter.format(order.shippingPrice)}</Typography>
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h5">Order Total</Typography>
                            <Typography variant="h5">{currencyFormatter.format(order.totalPrice)}</Typography>
                        </Box>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={downloadPDF}
                            sx={{ marginTop: 2 }}
                        >
                            Download Order PDF
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

OneOrder.propTypes = {
    data: PropTypes.object,
};

export default OneOrder;
