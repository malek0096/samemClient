import {
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    IconButton,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    OutlinedInput,
    FormHelperText
} from "@mui/material";
import { Scrollbar } from "../ui/Scrollbar";
import { Fragment, useState, useEffect, useCallback } from "react";
import { pagination } from "../../utils/paginations";
import { useNavigate } from "react-router-dom";
import { currencyFormatter } from "../../utils/currencyFormatter";
import { formatDate } from '../../utils/dateFormatter';
import PropTypes from 'prop-types';
import { orderApi } from '../../api/orderApi';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import toast from 'react-hot-toast';
import useAuth from "../../hooks/useAuth";
const OrderHistoryTable = (props) => {
    const { IsLoggedIn, user } = useAuth();
    const { data } = props;
    const navigate = useNavigate();
    const [orders, setOrders] = useState(data);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);
    const [selectedStatuses, setSelectedStatuses] = useState({});

    const isMounted = () => true; // Replace this with your actual implementation

    const GetAllOrders = useCallback(async () => {
        try {
            toast.promise(
                orderApi.GetAllOrders(),
                {
                    loading: 'Fetching data...',
                    error: 'Error while fetching data',
                },
                { id: 'fetching', success: { style: { display: 'none' } } }
            )
                .then((response) => {
                    if (isMounted()) {
                        setOrders(response);
                    }
                })
                .catch((error) => {
                    if (isMounted()) {
                        console.error(error);
                    }
                });
        } catch (err) {
            console.error(err);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        GetAllOrders();
    }, [GetAllOrders]);

    const onPageChange = (event, newPage) => {
        setPage(newPage);
    };

    const onRowsPerPageChange = (event) => {
        setLimit(parseInt(event.target.value, 10));
    };

    const handleDelete = async (id) => {
        try {
            await orderApi.DeleteOrder(id);
            GetAllOrders();
        } catch (error) {
            console.error("Failed to delete order", error);
        }
    };

    const handlePatch = async (id, status) => {
        try {
            await orderApi.PatchStatus(id, { status });
            GetAllOrders();
        } catch (error) {
            console.error("Failed to update order", error);
        }
    };

    const handleStatusChange = (id, newStatus) => {
        setSelectedStatuses(prev => ({ ...prev, [id]: newStatus }));
    };

    const paginatedData = pagination(orders, page, limit);

    return (
        <>
            <Card>
                <Scrollbar>
                    <Table sx={{ minWidth: 700 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Order ID</TableCell>
                                <TableCell>Order Owner</TableCell>
                                <TableCell>Order Date</TableCell>
                                <TableCell>Total Price</TableCell>
                                <TableCell>Paid</TableCell>
                                <TableCell>Delivered</TableCell>
                                <TableCell>Status</TableCell>
                                {user?.role !== "DESIGNER" && <TableCell align="right">Actions</TableCell>}
                            </TableRow>
                        </TableHead>
                        {paginatedData.length === 0 ? (
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={8} align="center">
                                        <Typography color="text.primary">No result</Typography>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        ) : (
                            <TableBody>
                                {paginatedData.map((item) => (
                                    <Fragment key={item?._id}>
                                        <TableRow key={item?._id} hover>
                                            <TableCell>
                                                <Typography color="text.primary">{item?._id}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="text.primary">{item?.shippingAddress?.fullName}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="text.primary">{formatDate(item?.createdAt)}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="text.primary">{currencyFormatter.format(item?.totalPrice)}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color={item?.isPaid ? "text.primary" : "red"}>{item?.isPaid
                                                    ? formatDate(item?.paidAt)
                                                    : 'No'}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color={item?.isDelivered ? "text.primary" : "red"}>{item?.isDelivered
                                                    ? formatDate(item?.deliveredAt)
                                                    : 'No'}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <FormControl variant="outlined" fullWidth size="small">
                                                    {user?.role === "DESIGNER" ? <Typography color={item?.status ? "text.primary" : "red"}>{item?.status}</Typography> :
                                                        <> <Select
                                                            value={selectedStatuses[item?._id] || item?.status || "pending"}
                                                            onChange={(e) => handleStatusChange(item?._id, e.target.value)}
                                                            input={<OutlinedInput label="Status" />}
                                                        >
                                                            <MenuItem value="pending">Pending</MenuItem>
                                                            <MenuItem value="completed">Completed</MenuItem>
                                                            <MenuItem value="canceled">Canceled</MenuItem>
                                                        </Select>
                                                            <FormHelperText>Select order status</FormHelperText></>
                                                    }

                                                </FormControl>
                                            </TableCell>
                                            {user?.role !== "DESIGNER" && <TableCell align="right">
                                                <IconButton
                                                    aria-label="details"
                                                    onClick={() => navigate(`/order/${item?._id}`, { state: { prevPath: location.pathname } })}
                                                >
                                                    <InfoIcon />
                                                </IconButton>
                                                <IconButton
                                                    aria-label="update"
                                                    onClick={() => {
                                                        const newStatus = selectedStatuses[item?._id];
                                                        if (newStatus && newStatus !== item?.status) {
                                                            handlePatch(item?._id, newStatus);
                                                        }
                                                    }}
                                                    style={{ marginLeft: '8px' }}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    aria-label="delete"
                                                    onClick={() => handleDelete(item?._id)}
                                                    style={{ marginLeft: '8px' }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>}

                                        </TableRow>
                                    </Fragment>
                                ))}
                            </TableBody>
                        )}
                    </Table>
                </Scrollbar>
                <TablePagination
                    component="div"
                    count={orders?.length}
                    onPageChange={onPageChange}
                    onRowsPerPageChange={onRowsPerPageChange}
                    page={page}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </Card>
        </>
    );
};

OrderHistoryTable.propTypes = {
    data: PropTypes.array,
};

export default OrderHistoryTable;
