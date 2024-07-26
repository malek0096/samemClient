import Heading from "../../../components/ui/Heading";
import { Box, Container, Divider, Grid, Typography, useMediaQuery } from "@mui/material";
import { productApi } from "../../../api/productApi";
import { useCallback, useEffect, useState } from "react";
import ProductForm from '../../../components/Dashboard/product/ProductForm';
import ProductImageFormImg from "../../../assets/samem webp/samem webp/Group 11.webp"


function ProductAdd() {
  const [options, setOptions] = useState({
    categories: [],
    sizes: [],
    brands: [],
  });


  const getOptions = useCallback(async () => {
    try {
      const result = await productApi.Getoptions();
      setOptions(result);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    getOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const isMdOrSmaller = useMediaQuery(theme => theme.breakpoints.down('md'));
  return (
    <>
      <Container maxWidth='xl'>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginLeft: "1rem",
            marginRight: "1rem",
          }}
        >
          <Heading title="New Design" description="make a new design" />
        </Box>
        <Divider
          sx={{
            marginY: 2,
            marginLeft: "1rem",
            marginRight: "1rem",
          }}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <ProductForm options={options} />
          </Grid>
          {!isMdOrSmaller && <Grid item xs={6}>
            <Typography variant="h2" fontWeight="bold" align="center" marginBottom='20px'>
              <Box
                component="img"
                sx={{
                  height: "100%", // Adjusted to cover full height
                  width: "100%",  // Adjusted to cover full width
                  objectFit: "cover", // Ensures the image covers the entire box
                  maxHeight: { xs: "100%", md: "100%" },
                  maxWidth: { xs: "85%", md: "85%" },
                }}
                alt="create new design form."
                src={ProductImageFormImg || ''}
              />
            </Typography>
          </Grid>}
        </Grid>
      </Container>
    </>
  );
}

export default ProductAdd;
