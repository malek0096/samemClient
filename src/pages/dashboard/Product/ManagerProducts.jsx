import { useCallback, useEffect, useState } from "react";
import {
    Box,
    IconButton,
    Modal,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Button
} from "@mui/material";
import { productApi } from "../../../api/productApi";
import { useMounted } from "../../../hooks/use-mounted";
import Splash from "../../../components/ui/Splash";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isMounted = useMounted();
    const navigate = useNavigate();

    const fetchProducts = useCallback(async () => {
        try {
            const response = await productApi.GetClientProducts();
            if (isMounted()) {
                setProducts(response.products);
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }, [isMounted]);

    const handleOpenModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
        setIsModalOpen(false);
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await productApi.DeleteProduct(productId);
            setProducts((prev) => prev.filter((product) => product._id !== productId));
            toast.success('Product deleted successfully');
        } catch (error) {
            console.error("Failed to delete product", error);
            toast.error('Failed to delete product');
        }
    };

    const handleActivateProduct = async (productId) => {
        try {
            await productApi.activateProduct(productId);
            setProducts((prev) =>
                prev.map((product) =>
                    product._id === productId ? { ...product, active: true, isAccepted: true } : product
                )
            );
            toast.success('Product activated successfully');
        } catch (error) {
            console.error("Failed to activate product", error);
            toast.error('Failed to activate product');
        }
    };

    const handleViewProductDetails = (productId) => {
        navigate(`/products/${productId}`);
    };

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <Box width="100%" margin="40px auto">
            <ToastContainer />
            {loading ? (
                <Splash />
            ) : (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product?._id}>
                                    <TableCell>{product?.name}</TableCell>
                                    <TableCell>{product?.price}</TableCell>
                                    <TableCell>{product?.category[0]?.name}</TableCell>
                                    <TableCell>{product?.price}</TableCell>
                                    <TableCell>
                                        <Typography color={product?.isAccepted ? 'green' : 'default'}>
                                            {product?.isAccepted ? "YES" : "NO"}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleOpenModal(product)}>
                                            <VisibilityIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteProduct(product?._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => handleActivateProduct(product?._id)}
                                            disabled={product?.isAccepted}
                                            style={{ color: product?.isAccepted ? 'green' : 'default' }}
                                        >
                                            <CheckCircleIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <Modal open={isModalOpen} onClose={handleCloseModal}>
                <Box
                    position="absolute"
                    top="3%"
                    left="20%"
                    transform="translate(-50%, -50%)"
                    width={800}
                    bgcolor="background.paper"
                    p={4}
                    boxShadow={24}
                >
                    {selectedProduct && (
                        <>
                            <Typography variant="h6" component="h2">
                                Name: {selectedProduct.name}
                            </Typography>
                            <Box display="flex" justifyContent="center" mb={2} flexWrap="wrap" gap={1}>
                                {selectedProduct.images.map((image) => (
                                    <img
                                        key={image._id}
                                        src={image.url}
                                        alt={selectedProduct?.name}
                                        style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }}
                                    />
                                ))}
                            </Box>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Field</TableCell>
                                            <TableCell>Value</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>{selectedProduct.name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Price</TableCell>
                                            <TableCell>{selectedProduct.price}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Category</TableCell>
                                            <TableCell>{selectedProduct.category[0].name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Description</TableCell>
                                            <TableCell>{selectedProduct.description}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Button
                                sx={{ mt: 2 }}
                                variant="contained"
                                onClick={() => handleActivateProduct(selectedProduct._id)}
                                disabled={selectedProduct.isAccepted}
                                style={{ color: selectedProduct?.isAccepted ? 'green' : 'default' }}
                            >
                                Activate
                            </Button>
                        </>
                    )}
                </Box>
            </Modal>
        </Box>
    );
};

export default ManageProducts;
