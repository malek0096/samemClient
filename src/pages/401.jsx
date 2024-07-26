import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Grid, Link } from '@mui/material'
import CustomButton from '../components/ui/CustomButton'
import pageNotFound from '../assets/pageNotFound.jpg'

const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))

const Error401 = () => {
  return (
    <Box className='content-center'>
      <Box sx={{ p: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <BoxWrapper>
          <Typography variant='h1'>401</Typography>
          <Typography variant='h5' sx={{ mb: 1, fontSize: '1.5rem !important' }}>
            You are not authorized! 🔐
          </Typography>
          <Grid item xs={6}>
            <Typography variant="h2" fontWeight="bold" align="center" marginBottom='20px'>
              <Box
                component="img"
                sx={{
                  height: "75%", // Adjusted to cover full height
                  width: "75%",  // Adjusted to cover full width
                  objectFit: "cover", // Ensures the image covers the entire box
                  maxHeight: { xs: "100%", md: "100%" },
                  maxWidth: { xs: "85%", md: "85%" },
                }}
                alt="The forget password image."
                src={pageNotFound || ''}
              />
            </Typography>
          </Grid>
          <Typography variant='body2'>You don&prime;t have permission to access this page. Go Home!</Typography>
        </BoxWrapper>
        <Link passHref href='/'>
          <CustomButton component='a' variant='contained' sx={{ px: 5.5, mt: 2 }}>
            Back to Home
          </CustomButton>
        </Link>
      </Box>
    </Box>
  )
}

export default Error401
