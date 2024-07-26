import { Paper, Typography } from "@mui/material"
import Forgetpassword from "../../components/auth/ForgetPassword"
import { styled } from "@mui/system";
import { useState } from "react";
import ChangeAvatarImage from "../../components/Profil/thumbnail.component";
import bgImage from '../../assets/bg-global.svg'

const CenteredContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundImage: `url(${bgImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
});


const CustomPaper = styled(Paper)({
    width: '90%',
    padding: '20px',
    border: "none",
    boxShadow: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
});
const SpacedTypography = styled(Typography)({
    marginBottom: '20px',
});

function ForgetPassword() {
    const [successMessage, setSuccessMessage] = useState('');

    const handleSuccess = (message) => {
        setSuccessMessage(message);
    };
    return (
        <CenteredContainer>
            <CustomPaper>
                {successMessage ? (
                    <Typography variant='h3' fontWeight='bold' align='center' >
                        {successMessage}
                    </Typography>
                ) : (
                    <>

                        <Forgetpassword onSuccess={handleSuccess} />
                    </>
                )}
            </CustomPaper>
        </CenteredContainer>
    );
}

export default ForgetPassword;
