import { Typography, Paper } from "@mui/material";
import { Box, styled } from "@mui/system";
import SigninForm from "../../components/auth/SigninForm";
import bgImage from '../../assets/bg-global.svg'
import logoSvg from '../../assets/animations/Group 427319094 (1).gif'

function Signin() {

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
    width: '40%',
    padding: '20px',
    border: "none",
    boxShadow: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0)',
  });

  return (

    <CenteredContainer>

      <CustomPaper>
        <Typography variant="h2" fontWeight="bold" align="center" marginBottom='20px'>
          <Box
            component="img"
            sx={{
              height: 240,
              width: 360,
              // maxHeight: { xs: 233, md: 167 },
              // maxWidth: { xs: 350, md: 250 },
            }}
            alt="The logo."
            src={logoSvg || ''}
          />
        </Typography>
        <SigninForm />
      </CustomPaper>
    </CenteredContainer>


  );

}

export default Signin;
