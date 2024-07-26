import PropTypes from 'prop-types';
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addToCart } from '../../app/feature/cartSlice';
import { toTitleCase } from '../../utils/toTitleCase';
import { currencyFormatter } from '../../utils/currencyFormatter';
import CustomButton from '../ui/CustomButton';
import { useHover } from '../../hooks/useHover';
import useTheme from '../../hooks/useTheme';

const ProductCard = (props) => {
  const { product, width } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mode, theme } = useTheme();
  const ref = useRef(null);
  const [hoverRef, isHovered] = useHover(ref);

  return (
    <Box
      width={width}
      margin={2}
      flexGrow={1}
      maxWidth={{ xs: '100%', sm: '50%', md: '50%', lg: '100%' }}
      position="relative" // Ensure position is relative for absolute positioning of hover elements
    >
      <Box
        ref={hoverRef}
        sx={{
          position: 'relative', // Ensure relative positioning for absolute child elements
          "&:hover .hover-actions": { display: "block" }, // Show hover actions on hover
        }}
      >
        <Box
          sx={{
            display: 'block',
            width: '100%',
            height: 'auto',
            maxWidth: '100%',
            margin: '0 auto',
            overflow: 'hidden', // Ensure images don't overflow their container
            paddingTop: '100%', // Maintain aspect ratio (1:1 for square images)
            position: 'relative', // Ensure proper stacking context for absolute positioned elements
          }}
        >
          <img
            alt={product?.name}
            src={product?.designImageUrls?.[0] || product?.designImageUrls?.[0] || product.images[0].url}
            style={{
              position: 'absolute', // Position image absolutely within its container
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </Box>
        <Box
          className="hover-actions" // Class for hover actions
          sx={{
            display: 'none', // Initially hidden
            position: 'absolute',
            bottom: '5%',
            left: 0,
            width: '100%',
            padding: '0 5%',
            zIndex: 1, // Ensure it's above the image
          }}
        >
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" alignItems="center" borderRadius="3px">
              <CustomButton
                onClick={() => navigate(`/productDetails/${product?._id}`)}
                variant="outlined"
                sx={{
                  color: mode === "dark" ? "black" : "",
                  borderColor: mode === "dark" ? "black" : ""
                }}
              >
                Preview
              </CustomButton>
            </Box>
            <CustomButton
              onClick={() => {
                dispatch(addToCart({ item: { ...product, quantity: 1 } }));
              }}
            >
              Add to Cart
            </CustomButton>
          </Box>
        </Box>
      </Box>

      <Box mt="3px">
        <Typography color={theme.palette.neutral.light}>
          {product?.category[0]?.name}
        </Typography>
        <Typography>{toTitleCase(product?.name)}</Typography>
        <Typography fontWeight="bold">{currencyFormatter.format(product?.price)}</Typography>
      </Box>
    </Box>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
};

export default ProductCard;
