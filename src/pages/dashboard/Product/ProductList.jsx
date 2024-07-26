import CustomButton from "../../../components/ui/CustomButton"
import { Divider, Box, Container, Typography, Grid } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import Heading from "../../../components/ui/Heading";
import ProductListTable from "../../../components/Dashboard/product/ProductListTable";
import { Link, Navigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { productApi } from "../../../api/productApi";
import { useMounted } from "../../../hooks/use-mounted";
import { toast } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import myDesignImgForm from "../../../assets/samem webp/samem webp/Site-Builder-1--Streamline-Milano.webp"
import { width } from "@mui/system";

function ProductsList() {
  const isMounted = useMounted()
  const [products, setProducts] = useState([])
  const { IsLoggedIn, user } = useAuth();
  if (!IsLoggedIn) {
    return <Navigate to="/signin" replace />;
  }

  const GetProducts = useCallback(async () => {
    try {
      toast.promise(
        //productApi.GetProductsByUserId({ id: user._id }),
        productApi.GetProducts(user.userId),
        {
          loading: 'Fetching data...',
          error: 'Error while fetching data',
        },
        { id: 'fetching', success: { style: { display: 'none' } } }
      )
        .then((response) => {
          if (isMounted()) {
            setProducts(response);
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
    GetProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let ptochanged = []
  return (
    <>
      {!products.length ? <Container maxWidth='xl' sx={{ marginBottom: '14px' }}>
        <Typography variant="h1" sx={{ textAlign: "center" }}> <b>You haven't posted any design yet <br /> try to upload an awesome artwork</b>.</Typography><br />
        <Grid item xs={12} spacing={3}>
          <Typography variant="h4" fontWeight="bold" align="center" marginBottom='20px'>
            <Box
              component="img"
              sx={{
                height: "25%", // Adjusted to cover full height
                width: "25%",  // Adjusted to cover full width
                objectFit: "cover", // Ensures the image covers the entire box
                maxHeight: { xs: "25%", md: "25%" },
                maxWidth: { xs: "25%", md: "25%" },
              }}
              alt="The forget password image."
              src={myDesignImgForm || ''}
            />
            <Grid item xs={12}>
              <CustomButton
                variant="contained"
                color="primary"
                type="submit"
                disabled={false}
                fullWidth
                size="large"
                sx={{
                  width: "50%",
                  bgcolor: 'dark'
                }}
                component={Link}
                to="/dashboard/products/add"
              >
                {'+New Design'}
              </CustomButton>
            </Grid>
          </Typography>
        </Grid>

      </Container> : <Container maxWidth='xl' sx={{ marginBottom: '14px' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginLeft: '1rem',
            marginRight: '1rem',
          }}
        >
          <Heading title={`Products (${products.length})`} description="Manage products for your store" />

          <CustomButton
            component={Link}
            to="/dashboard/products/add"
          >
            <AddIcon sx={{ marginRight: 1, height: '1rem', width: '1rem' }} /> Add New
          </CustomButton>
        </Box>
        <Divider
          sx={{
            marginY: 2,
            marginLeft: '1rem',
            marginRight: '1rem',
          }} />
        <Box sx={{ mt: 3 }}>
          <ProductListTable products={products} />
        </Box>
      </Container >}
    </>
  )
}

export default ProductsList