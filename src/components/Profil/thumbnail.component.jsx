import React, { useState } from 'react';
import { Modal, Box, Button, Paper, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const AvatarContainer = styled(Box)({
    position: 'relative',
    display: 'inline-block',
    cursor: 'pointer',
});

const ProfileImage = styled('img')({
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
});

const CustomModal = styled(Modal)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const ModalContent = styled(Paper)({
    padding: '20px',
    textAlign: 'center',
    width: '300px',
    borderRadius: '10px',
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
    position: 'relative',
    '&.dragging': {
        background: '#f0f0f0', // Example background color when dragging
    },
    '&.dragActive': {
        border: '2px dashed #2196f3', // Example dashed border when dragging active
    },
});

const CloseButton = styled(IconButton)({
    position: 'absolute',
    top: '10px',
    right: '10px',
});

const Title = styled('h2')({
    margin: '10px 0',
});

const FileInput = styled('input')({
    display: 'none',
});

const DropArea = styled('div')({
    height: '150px',
    border: '2px dashed #ccc',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    '&.dragActive': {
        background: '#f0f0f0', // Example background color when dragging
        border: '2px dashed #2196f3', // Example dashed border when dragging active
    },
});

const ChangeAvatar = ({ image, onImageChange }) => {
    const defaultImage = "https://via.placeholder.com/100";
    const [profile, setProfile] = useState(image || defaultImage);
    const [modalOpen, setModalOpen] = useState(false);
    const [dragging, setDragging] = useState(false);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile(reader.result);
                onImageChange(file); // Passes the selected file back to the parent component
            };
            reader.readAsDataURL(file);
        }
        setModalOpen(false);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);
        const file = event.dataTransfer.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile(reader.result);
                onImageChange(file); // Passes the selected file back to the parent component
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadClick = () => {
        const fileInput = document.getElementById('file-input');
        if (fileInput) {
            fileInput.click();
        }
    };

    return (
        <>
            <AvatarContainer onClick={() => setModalOpen(true)}>
                <ProfileImage src={profile} alt="Profile" />
                <IconButton
                    style={{
                        position: 'absolute',
                        bottom: '5px',
                        right: '5px',
                        backgroundColor: 'white',
                        borderRadius: '50%',
                    }}
                >
                    <PhotoCameraIcon />
                </IconButton>
            </AvatarContainer>

            <CustomModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                aria-labelledby="change-image-modal"
                aria-describedby="change-profile-image"
            >
                <ModalContent
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={dragging ? 'dragging' : ''}
                >
                    <CloseButton onClick={() => setModalOpen(false)}>
                        <PhotoCameraIcon />
                    </CloseButton>
                    <Title id="change-image-modal">Change Profile Image</Title>
                    <DropArea
                        onClick={handleUploadClick}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={dragging ? 'dragActive' : ''}
                    >
                        {dragging ? <p>Drop here</p> : <p>Drag & Drop or Click to Upload</p>}
                        <FileInput
                            id="file-input"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </DropArea>
                    <Button variant="contained" color="primary" onClick={() => setModalOpen(false)}>Close</Button>
                </ModalContent>
            </CustomModal>
        </>
    );
};

export default ChangeAvatar;
