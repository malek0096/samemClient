import SignupForm from "../../components/auth/SignupForm";
import { styled } from "@mui/system";
import { Typography, Paper } from "@mui/material";
import ChangeAvatarImage from "../../components/Profil/thumbnail.component";
import bgImage from '../../assets/bg-global.svg'
const Signup = () => {

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
  return (

    <CenteredContainer>

      <CustomPaper>

        <SignupForm />
      </CustomPaper>
    </CenteredContainer>
  );
};

export default Signup;
