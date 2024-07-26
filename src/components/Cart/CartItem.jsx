import PropTypes from "prop-types";
import { Box, Divider, IconButton, Typography, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { decreaseCount, increaseCount, removeFromCart, setSizeInCart } from "../../app/feature/cartSlice";
import { currencyFormatter } from "../../utils/currencyFormatter";
import { toTitleCase } from "../../utils/toTitleCase";
import { toast } from "react-hot-toast";
import useTheme from "../../hooks/useTheme";
import { tokens } from "../../theme/theme";
import { FlexBox } from ".";

const CartItem = (props) => {
  const { product, showed = true } = props;
  console.log({ product });
  const DefaultPrice = product.price;
  const { _id, name, designImage: images, category, quantity, price, countInStock, parentCategory, sizes, size } = product;
  const availableSizes = ['XXL', "XL", 'L', 'M', "S"];
  const { theme } = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

  // Retrieve selected sizes from localStorage based on _id
  const initialSelectedSizes = JSON.parse(localStorage.getItem(`selectedSizes_${_id}`)) || [];

  const [selectedSizes, setSelectedSizes] = useState(initialSelectedSizes);

  // Update localStorage whenever selectedSizes changes
  useEffect(() => {
    localStorage.setItem(`selectedSizes_${_id}`, JSON.stringify(selectedSizes));
  }, [selectedSizes, _id]);

  const handleSizeClick = (size) => {
    setSelectedSizes((prevSelectedSizes) =>
      prevSelectedSizes.includes(size)
        ? prevSelectedSizes.filter((s) => s !== size)
        : [...prevSelectedSizes, size]
    );

    dispatch(setSizeInCart({ id: _id, size: selectedSizes }));
  };

  return (
    <Box key={`${name}-${_id}`} mb={2}>
      <FlexBox p="15px 0">
        <Box flex="1 1 40%">
          <img
            alt={name}
            width="123px"
            height="160px"
            src={images[0].url}
            loading="lazy"
          />
        </Box>
        <Box flex="1 1 60%">
          <FlexBox mb="5px">
            <Typography fontWeight="bold" sx={{ color: colors.grey[100] }}>
              {toTitleCase(name)}
            </Typography>
            <IconButton
              onClick={() => dispatch(removeFromCart({ id: _id }))}
            >
              <CloseIcon />
            </IconButton>
          </FlexBox>
          {category && (
            <Typography fontSize={11}>
              {`${category[0]?.name} / ${parentCategory ? `${parentCategory[0]?.name} ` : ''}`}
            </Typography>
          )}
          {showed && <FlexBox m="15px 0" alignItems="center">
            <Box
              display="flex"
              alignItems="center"
              border={`1.5px solid ${colors.grey[100]}`}
            >
              <IconButton
                onClick={() => dispatch(decreaseCount({ id: _id }))}
              >
                <RemoveIcon />
              </IconButton>
              <Typography>{quantity}</Typography>
              <IconButton
                onClick={() => {
                  if (countInStock < quantity + 1) {
                    toast.error('Sorry. Product is out of stock');
                  } else {
                    dispatch(increaseCount({ id: _id }));
                  }
                }}
              >
                <AddIcon />
              </IconButton>
            </Box>
            <Typography fontWeight="bold" sx={{ color: colors.grey[100] }}>
              {currencyFormatter.format(DefaultPrice)}
            </Typography>
          </FlexBox>}
          {!showed && (
            <div>
              {selectedSizes.map((size, index) => (
                <Box key={index} sx={{
                  display: "inline-block",
                  backgroundColor: "black",
                  color: "white",
                  padding: "5px 10px",
                  margin: "5px",
                  borderRadius: "5px",
                }}>
                  {size}
                </Box>
              ))}
            </div>
          )}

          {showed && <Box display="flex" alignItems="center">
            {availableSizes.map((size) => (
              <Button
                key={size}
                onClick={() => handleSizeClick(size)}
                sx={{
                  backgroundColor: selectedSizes.includes(size) ? 'black' : 'white',
                  color: selectedSizes.includes(size) ? 'white' : 'black',
                  border: `1px solid ${colors.grey[100]}`,
                  margin: '0 5px',
                  minWidth: '30px',
                  height: '30px',
                  padding: '5px',
                  fontSize: '12px',
                }}
              >
                {size}
              </Button>
            ))}
          </Box>}
          {!showed && <Box
            sx={{
              backgroundColor: 'white',

              fontSize: '13px',
            }}
          ><strong>Quantity:</strong> :{quantity}</Box>}
        </Box>
      </FlexBox>
      <Divider />
    </Box>
  );
};

CartItem.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      })
    ),
    category: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ),
    parentCategory: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    countInStock: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItem;
