import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const PricingModal = ({ isOpen, onClose, setTotalPrice }) => {
    const [price, setPrice] = useState('');

    const handleConfirmPrice = () => {
        setTotalPrice(parseFloat(price)); // Convert price to a float and set the total price
        onClose();
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Set Total Price</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Total Price"
                    type="number"
                    fullWidth
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleConfirmPrice} color="primary">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

PricingModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    setTotalPrice: PropTypes.func.isRequired,
};

export default PricingModal;
