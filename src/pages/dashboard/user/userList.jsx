import { useCallback, useEffect, useState } from 'react';
import Heading from '../../../components/ui/Heading';
import { Divider, Box, Container, IconButton, Modal, Typography, Paper, Button, Avatar } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useMounted } from '../../../hooks/use-mounted';
import { profilApi } from '../../../api/profilApi';
import { toast } from 'react-hot-toast';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockIcon from '@mui/icons-material/Block';
import InfoIcon from '@mui/icons-material/Info';
import { Instagram, Facebook, LinkedIn } from '@mui/icons-material'
function Users() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isMounted = useMounted();

    const getAllProfiles = useCallback(async () => {
        try {
            toast.promise(
                profilApi.getProfiles(),
                {
                    loading: 'Fetching data...',
                    error: 'Error while fetching data',
                },
                { id: 'fetching', success: { style: { display: 'none' } } }
            )
                .then((response) => {
                    if (isMounted()) {
                        setUsers(response.map(user => ({ ...user, isActive: user.isActive ?? false })));
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
        getAllProfiles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = async (id) => {
        try {
            await profilApi.deleteUser(id);
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
            toast.success('User deleted successfully');
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Failed to delete user');
        }
    };

    const handleToggleActivation = async (id, isActive) => {
        try {
            await profilApi.activateUser(id, { isAccepted: !isActive });
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === id ? { ...user, isAccepted: !isActive } : user
                )
            );
            toast.success(`User ${isActive ? 'deactivated' : 'activated'} successfully`);
            setIsModalOpen(false);
        } catch (error) {
            console.error(`Error ${isActive ? 'deactivating' : 'activating'} user:`, error);
            toast.error(`Failed to ${isActive ? 'deactivate' : 'activate'} user`);
        }
    };

    const handleUserInfo = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 200 },
        { field: 'name', headerName: 'Full Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 270 },
        // { field: 'profit', headerName: 'Profit', width: 200 },
        { field: 'phoneNumber', headerName: 'Phone Number', width: 200 },
        { field: 'isActive', headerName: 'active', width: 200 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handleUserInfo(params.row)}>
                        <InfoIcon />
                    </IconButton>
                    <IconButton onClick={() => handleToggleActivation(params.row.id, params.row.isActive)}>
                        {params.row.isAccepted ? <BlockIcon /> : <CheckCircleIcon />}
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.row.id)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        },
    ];

    return (
        <>
            <Container maxWidth='xl' sx={{ marginBottom: '14px' }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginLeft: '1rem',
                        marginRight: '1rem',
                        marginTop: '1rem',
                    }}
                >
                    <Heading title={`Users (${users?.length})`} description={``} />
                </Box>
                <Divider
                    sx={{
                        marginY: 2,
                        marginLeft: '1rem',
                        marginRight: '1rem',
                    }}
                />
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={users} columns={columns} pageSize={5} />
                </div>
            </Container>
            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                aria-labelledby="user-info-modal-title"
                aria-describedby="user-info-modal-description"
            >
                <Paper
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        padding: 4,
                    }}
                >
                    {selectedUser && (
                        <>
                            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                <Avatar
                                    src={selectedUser.profileImageUrl}
                                    alt={selectedUser.name}
                                    sx={{ width: 100, height: 100 }}
                                />
                                <Typography id="user-info-modal-title" variant="h6" component="h2" sx={{ mt: 2 }}>
                                    User Information
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                {selectedUser.instagram && (
                                    <a href={selectedUser.instagram} target="_blank" rel="noopener noreferrer">
                                        <Instagram sx={{ mx: 1 }} />
                                    </a>
                                )}
                                {selectedUser.facebook && (
                                    <a href={selectedUser.facebook} target="_blank" rel="noopener noreferrer">
                                        <Facebook sx={{ mx: 1 }} />
                                    </a>
                                )}
                                {selectedUser.linkedin && (
                                    <a href={selectedUser.linkedin} target="_blank" rel="noopener noreferrer">
                                        <LinkedIn sx={{ mx: 1 }} />
                                    </a>
                                )}
                            </Box>
                            <Typography id="user-info-modal-description" sx={{ mt: 2 }}>
                                <strong>ID:</strong> {selectedUser.id}
                            </Typography>

                            <Typography sx={{ mt: 2 }}>
                                <strong>Full Name:</strong> {selectedUser.name}
                            </Typography>
                            <Typography sx={{ mt: 2 }}>
                                <strong>Email:</strong> {selectedUser.email}
                            </Typography>
                            <Typography sx={{ mt: 2 }}>
                                <strong>Phone Number:</strong> {selectedUser.phoneNumber}
                            </Typography>
                            <Typography sx={{ mt: 2 }}>
                                <strong>Bio:</strong> {selectedUser.bio}
                            </Typography>

                            <Typography sx={{ mt: 2 }}>
                                <strong>Verified:</strong> {selectedUser.verified ? "Verified" : "Not Verified"}
                            </Typography>
                            <Typography sx={{ mt: 2 }}>
                                <strong>Status:</strong> {selectedUser.isAccepted ? "Active" : "Not Active"}
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginTop: 4,
                                }}
                            >
                                <Button
                                    variant="contained"
                                    color={selectedUser.isActive ? 'secondary' : 'primary'}
                                    onClick={() => handleToggleActivation(selectedUser.id, selectedUser.isActive)}
                                >
                                    {selectedUser.isActive ? 'Deactivate' : 'Activate'}
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => handleDelete(selectedUser.id)}
                                >
                                    Delete
                                </Button>
                            </Box>
                        </>
                    )}
                </Paper>
            </Modal>
        </>
    );
}

export default Users;
