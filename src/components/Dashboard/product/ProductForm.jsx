import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, TextField, Stack, TextareaAutosize, Typography, Modal, Box, Button } from "@mui/material";
import { LoadingButton } from '@mui/lab';
import FileDropzone from "../../FileDropzone";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { ProductvalidationSchema } from './ProductFormValidation';
import { toast } from 'react-hot-toast';
import { useMounted } from '../../../hooks/use-mounted';
import { productApi } from '../../../api/productApi';
import useAuth from '../../../hooks/useAuth';
import logo from "../../../assets/logo.png"
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ProductForm = (props) => {
    const { initialData: initialDataProp, options } = props;
    const { id } = useParams(); // Get the product ID from the URL
    const { user } = useAuth();
    const navigate = useNavigate();
    const isMounted = useMounted();
    const [files, setFiles] = useState([]);
    const [privateDesignPng, setPrivateDesignPng] = useState(null);
    const [price, setPrice] = useState(25);
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); // State to track form submission status
    const [modalOpen, setModalOpen] = useState(false); // State for modal
    const [frais, setFrais] = useState(0); // State for frais input
    const [finalPrice, setFinalPrice] = useState(price); // State for final price

    const initialData = {
        category: initialDataProp?.category || "667f39e3c7a39520c54e480e",
        description: initialDataProp?.description || " ",
        images: initialDataProp?.designImage || [],
        privateDesignPng: initialDataProp?.privateDesignPng || [],
        name: initialDataProp?.name || "",
        price: initialDataProp?.price || 25,
        sizes: [],
        brand: initialDataProp?.brand || "",
        countInStock: initialDataProp?.countInStock || 0,
        isFeatured: initialDataProp?.isFeatured || false,
        isArchived: initialDataProp?.isArchived || false,
    };

    const [productData, setProductData] = useState(initialData);

    const handleDrop = (newFiles) => {
        const validFiles = newFiles.filter(file =>
            ['image/png', 'image/jpeg', 'image/webp'].includes(file.type)
        );
        if (!validFiles.length) {
            toast.error('Please drop a PNG, JPEG, or WEBP file.');
        }

        setFiles((prevFiles) => [...prevFiles, ...validFiles]);
        formik.setFieldValue('images', [
            ...formik.values.images,
            ...validFiles,
        ]);
    };

    const handleRemove = (file) => {
        setFiles((prevFiles) =>
            prevFiles.filter((_file) => _file.path !== file.path)
        );
    };

    const handlePrivateDesignDrop = (newFiles) => {
        const file = newFiles[0];
        if (file && file.type === 'image/png') {
            setPrivateDesignPng(file);
            formik.setFieldValue('privateDesignPng', file);
        } else {
            toast.error('Please drop a PNG file.');
        }
    };

    const handleRemovePrivateDesign = () => {
        setPrivateDesignPng(null);
        formik.setFieldValue('privateDesignPng', null);
    };

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    const handleConfirmPrice = () => {
        setFinalPrice(price + frais);
        handleCloseModal();
        formik.submitForm();
    };

    const onSubmitHandler = async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
            setIsSubmitting(true);
            let response;
            const formData = new FormData();
            formData.append('category', values.category);
            formData.append('name', values.name);
            formData.append('price', finalPrice);
            formData.append('description', description); // Include description in formData
            values.images.forEach((image) => {
                formData.append("images", image);
            });
            if (privateDesignPng) {
                formData.append('logo', privateDesignPng);
            } else {
                setIsSubmitting(false);
                setSubmitting(false);
                navigate('/dashboard/products/add');

                toast.error('privateDesignPng is required');
                return

            }

            formData.forEach((value, key) => {
                console.log(key + " " + value);
            });

            // Example API call using productApi
            response = productApi.AddProduct(user.userId, formData);

            toast.promise(
                response,
                {
                    loading: 'Adding data',
                    error: 'Error while adding the data',
                    success: 'Product Added!'
                },
            );

            response
                .then(() => {
                    if (isMounted()) {
                        setStatus({ success: true });
                        setSubmitting(false);
                        navigate('/dashboard/products');
                    }
                })
                .catch((error) => {
                    if (isMounted()) {
                        setStatus({ success: false });
                        setErrors(error);
                        setSubmitting(false);
                    }
                });
        } catch (err) {
            toast.error('Something went wrong!', err);
        } finally {
            setIsSubmitting(true);
        }
    };

    const formik = useFormik({
        initialValues: productData,
        validationSchema: ProductvalidationSchema,
        onSubmit: onSubmitHandler,
    });

    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
    } = formik;



    //modal style 
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: '10px',
    };
    //end style modal
    return (
        <>
            <form onSubmit={(e) => { e.preventDefault(); handleOpenModal(); }} noValidate>
                <Stack spacing={0}>
                    <Card sx={{ border: 'none', boxShadow: 'none' }}>
                        <CardContent>
                            <TextField
                                fullWidth
                                name="name"
                                label="Product Name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                        </CardContent>
                    </Card>
                    <Card sx={{ border: 'none', boxShadow: 'none' }}>
                        <CardContent>
                            <TextareaAutosize
                                rows={6}
                                placeholder="Product Description"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                style={{
                                    width: '100%',
                                    minHeight: 100,
                                    padding: '10px',
                                    borderRadius: '4px',
                                    borderColor: '#ccc',
                                    fontSize: '16px',
                                    resize: 'vertical',
                                }}
                            />
                            {formik.touched.description && formik.errors.description && (
                                <Typography color="error" variant="body2">
                                    {formik.errors.description}
                                </Typography>
                            )}
                        </CardContent>
                    </Card>
                    <Card sx={{ border: 'none', boxShadow: 'none' }}>
                        <CardContent>
                            <FileDropzone
                                caption="Drop images here"
                                files={files}
                                onDrop={handleDrop}
                                onRemove={handleRemove}
                            />
                            {formik.touched.images && formik.errors.images && (
                                <Typography color="error" variant="body2">
                                    {formik.errors.images}
                                </Typography>
                            )}
                        </CardContent>
                    </Card>
                    <Card sx={{ border: 'none', boxShadow: 'none' }}>
                        <CardContent>
                            <FileDropzone
                                caption="Drop private design PNG here"
                                files={privateDesignPng ? [privateDesignPng] : []}
                                onDrop={handlePrivateDesignDrop}
                                onRemove={handleRemovePrivateDesign}
                            />
                            {formik.touched.privateDesignPng && formik.errors.privateDesignPng && (
                                <Typography color="error" variant="body2">
                                    {formik.errors.privateDesignPng}
                                </Typography>
                            )}
                        </CardContent>
                    </Card>
                    <Card sx={{ border: 'none', boxShadow: 'none' }}>
                        <CardContent>
                            <LoadingButton
                                variant="contained"
                                type="submit"
                                sx={{ width: "100%" }}
                                loading={isSubmitting} // Display loading spinner when submitting
                                disabled={isSubmitting} // Disable the button when submitting
                            >
                                Submit
                            </LoadingButton>
                        </CardContent>
                    </Card>
                </Stack>
            </form>
            <Modal
                open={modalOpen}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style, maxWidth: '23%', mx: 'auto', p: 3 }}>
                    {/* Title with dashed divider */}
                    {/* <Typography variant="h6" component="h2" align="center" color="grey.600">
                        Dallali Innovation Group
                    </Typography> */}
                    {/* <Box sx={{ borderBottom: '1px dashed grey', my: 2 }} /> */}

                    {/* Logo */}
                    <Box sx={{ mb: 2, display: "flex", justifyContent: "center", width: '100%' }}>
                        <img src={logo} alt="Logo" style={{ width: '15%' }} />
                    </Box>
                    <Box sx={{ borderBottom: '1px dashed grey', mb: 2 }} />

                    {/* Information */}
                    <Typography variant="h5" component="h2" align="center">
                        Design Pricing Sheet
                    </Typography>
                    <Box sx={{ fontFamily: 'Inter', fontSize: '16px', textAlign: 'start', mt: 2 }}>
                        <Typography variant="body2">Designer: {user?.name}</Typography>
                        <Typography variant="body2">Phone: {user?.phoneNumber || "+216"}</Typography>
                        <Typography variant="body2">Email: {user.email}</Typography>
                    </Box>
                    <Box sx={{ borderBottom: '1px dashed grey', my: 2 }} />

                    {/* Design Name */}
                    <Typography variant="body2">Design Name: Batman T-shirt cartoon design</Typography>
                    <Box sx={{ borderBottom: '1px dashed grey', my: 2 }} />

                    {/* Additional Fees */}
                    <Typography variant="body2" component="div">
                        T-shirt price
                    </Typography>
                    <Typography variant="body2" component="div">
                        Printing services
                    </Typography>
                    <Typography variant="body2" component="div">
                        Customer support services
                    </Typography>
                    <Typography variant="body2" component="div">
                        Packaging fees
                    </Typography>
                    <Box sx={{ borderBottom: '1px dashed grey', my: 2 }} />

                    {/* Total Price */}
                    {/* <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                        T-shirt price: {price + frais} DT
                    </Typography> */}

                    {/* Grid Layout */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                        <Typography variant="body2" sx={{ alignSelf: 'center' }}>
                            In your opinion, how much is a single copy of this amazing design worth?
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                            <TextField
                                fullWidth={false}
                                type='number'
                                min={4}
                                max={999}
                                label="Additional Fees (in DT)"
                                value={frais}
                                onChange={(event) => setFrais(parseFloat(event.target.value) || 0)}
                                margin="normal"
                                inputProps={{ maxLength: 3 }}
                                sx={{ width: '90px', '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ borderBottom: '1px dashed grey', my: 2 }} />
                    <Typography variant="h5" sx={{ mt: 1, fontWeight: 'bold', mb: 2, textAlign: "end" }}>
                        T-shirt price: <Typography variant="strong" sx={{ color: "green" }}>{price + frais}DT</Typography>
                    </Typography>
                    <Box sx={{ borderBottom: '1px dashed grey', my: 2 }} />
                    {/* Action Buttons */}
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Button onClick={handleCloseModal} variant="outlined">Close</Button>
                        <Button onClick={handleConfirmPrice} variant="contained">Confirm</Button>
                    </Box>
                </Box>
            </Modal>

        </>
    );
};

ProductForm.propTypes = {
    initialData: PropTypes.object,
    options: PropTypes.array
};

export default ProductForm;
