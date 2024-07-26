import { Box, Typography, useMediaQuery } from "@mui/material";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { maxHeight } from "@mui/system";


const gallery = Object.values(import.meta.glob('../../../assets/slider-images/*.{png,jpg,jpeg,PNG,JPEG,gif,GIF,webp,WEBP}', { eager: true, as: 'url' }));


const MainSlider = () => {
  const isMobileScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <Box>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {gallery.map((texture, index) => (
          <SwiperSlide key={`slider-image-${index}`} >
            <Box
              position="relative"
              sx={{
                height: 'calc(100vh - 11rem)', // Adjust height as needed
                overflow: 'hidden', // Hide overflow to maintain aspect ratio
                display: 'flex',
                alignItems: 'center', // Center image vertically
                justifyContent: 'center' // Center image horizontally
              }}
            >
              <img
                src={texture}
                alt={`slider-${index}`}
                style={{
                  width: "100%",
                  maxHeight: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                  margin: "0 auto",
                }}
              />


            </Box>
          </SwiperSlide>
        ))}


      </Swiper>
    </Box>
  );
};

export default MainSlider;
