import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ShoppingList from '../components/home/ShoppingList';
import Brands from '../components/home/sliders/BrandsSlider';
import MainCarousel from '../components/home/sliders/MainSlider';
import WeOffer from '../components/home/WeOffer';
import JoinUs from '../components/home/JoinUs';
import ShopFooter from '../layouts/ShopFooter';
import BestDesigners from '../components/home/PorilSliders/BestDesigners';
import useAuth from '../hooks/useAuth';

function Home() {
  const { IsLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (IsLoggedIn) {
      navigate('/dashboard/overview');
    }
  }, [IsLoggedIn, navigate]);

  return (
    <Box>
      {!IsLoggedIn ? (
        <>
          <MainCarousel />
          {/* <Brands /> */}
          <ShoppingList />
          {/* <JoinUs /> */}
          <BestDesigners />
          {/* <WeOffer /> */}
          <ShopFooter />
        </>
      ) : null}
    </Box>
  );
}

export default Home;
