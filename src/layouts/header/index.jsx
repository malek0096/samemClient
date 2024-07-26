import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Container from '@mui/material/Container';
import useAuth from '../../hooks/useAuth';
import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Badge, Button, IconButton, Box, useMediaQuery, Typography } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { setIsCartOpen } from '../../app/feature/cartSlice';
import useTheme from '../../hooks/useTheme';
import { SideNav } from '../SideNav';
import Logo from '../../components/ui/Logo';
import { productApi } from '../../api/productApi';
import { useMounted } from '../../hooks/use-mounted';
import UserDropdown from './UserDropdown';
import CategoriesDropDown from './categoriesDropDown';
import Searchbar from './Searchbar';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

function Navbar() {
  const { IsLoggedIn, user } = useAuth();

  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [fakeRole, setFakeRole] = useState("DESIGNER");
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isMobileScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const location = useLocation();

  const handleOpenNavMenu = () => {
    setIsSideNavOpen(true);
  };

  const handleCloseNavMenu = () => {
    setIsSideNavOpen(false);
  };

  let navigationLinks = [];

  if (user?.role === "ADMIN") {
    navigationLinks = [
      { name: "Overview", href: "/dashboard/overview" },
      { name: "Orders", href: "/dashboard/orders" },
      { name: "Manager-products", href: "/dashboard/Manage-products" },
      { name: "Users", href: "/dashboard/users" },
    ];
  } else {
    navigationLinks = [
      { name: "Overview", href: "/dashboard/overview" },
      { name: "Products", href: "/dashboard/products" },

    ];
  }

  console.log({ role: user?.role });

  const [categories, setCategories] = useState([]);
  const isMounted = useMounted();

  const GetCategories = useCallback(async () => {
    try {
      const response = await productApi.GetCategories();
      if (isMounted()) {
        setCategories(response);
      }
    } catch (error) {
      console.error(error);
    }
  }, [isMounted]);

  useEffect(() => {
    GetCategories();
  }, [GetCategories]);

  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        backdropFilter: 'blur(6px)',
        justifyContent: "space-between",
        position: 'fixed',
        top: 0,
        left: 0,
        width: "100%",
        height: '80px',
        zIndex: 1,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {!isMobileScreen && (<Logo />)}
          <Box sx={{ flexGrow: 1 }}>
            {isMobileScreen && (
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="primary"
              >
                <MenuIcon />
              </IconButton>
            )}

            {isMobileScreen && isSideNavOpen && (
              <SideNav onClose={handleCloseNavMenu} open={handleOpenNavMenu} categories={categories} />
            )}
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <>
              {IsLoggedIn && user?.role ? (
                navigationLinks.map((item) => (
                  <Button
                    variant="h4"
                    key={item.name}
                    to={item.href}
                    component={Link}
                    sx={{
                      my: 2,
                      color: theme.palette.primary.main,
                      display: 'block',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      borderBottom: `${location.pathname === item.href ? '2px solid #998e76' : 'none'}`,
                      transition: 'all .15s linear'
                    }}
                  >
                    {item.name}
                  </Button>
                ))
              ) : (
                null
              )}
            </>
            {!user?.role && (
              <>
                <Button
                  variant='h4'
                  to={"/"}
                  component={Link}
                  sx={{
                    my: 2,
                    color: theme.palette.primary.main,
                    display: 'block',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    borderBottom: `${location.pathname === "/" ? '2px solid #998e76' : 'none'}`,
                    transition: 'all .15s linear'
                  }}
                >
                  Home
                </Button>
                <Button
                  variant='h4'
                  to={"/Mousamem-program"}
                  component={Link}
                  sx={{
                    my: 2,
                    color: theme.palette.primary.main,
                    display: 'block',
                    margin: "1rem",
                    fontWeight: '',
                    fontSize: '14px',
                    borderBottom: `${location.pathname === "/" ? '2px solid #998e76' : 'none'}`,
                    transition: 'all .15s linear'
                  }}
                >
                  Mousamem program
                </Button>
                <Button
                  variant='h4'
                  to={"/About"}
                  component={Link}
                  sx={{
                    my: 2,
                    color: theme.palette.primary.main,
                    display: 'block',
                    margin: "1rem",
                    fontWeight: '',
                    fontSize: '14px',
                    borderBottom: `${location.pathname === "/" ? '2px solid #998e76' : 'none'}`,
                    transition: 'all .15s linear'
                  }}
                >
                  About
                </Button>
                <Button
                  variant='h4'
                  to={"/contact-us"}
                  component={Link}
                  sx={{
                    my: 2,
                    color: theme.palette.primary.main,
                    display: 'block',
                    margin: "1rem",
                    fontWeight: '',
                    fontSize: '14px',
                    borderBottom: `${location.pathname === "/" ? '2px solid #998e76' : 'none'}`,
                    transition: 'all .15s linear'
                  }}
                >
                  Contact
                </Button>
              </>
            )}
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" gap="5px">
            {!user?.role && <Searchbar />}
            {!user?.role && (
              <Badge
                badgeContent={cart.reduce((a, c) => a + Number(c.quantity), 0)}
                color="secondary"
                invisible={cart.length === 0}
                sx={{
                  "& .MuiBadge-badge": {
                    right: 5,
                    top: 5,
                    padding: "0 4px",
                    height: "20px",
                    minWidth: "20px",
                    fontSize: "14px",
                    fontWeight: "800"
                  },
                }}
              >
                <IconButton
                  onClick={() => dispatch(setIsCartOpen({}))}
                  aria-label="Shopping Cart"
                  color="primary"
                >
                  <ShoppingCartOutlinedIcon />
                </IconButton>
              </Badge>
            )}
            {IsLoggedIn && user?.role === "DESIGNER" && (
              <Box display="flex" alignItems="center" gap="5px">
                <AccountBalanceWalletIcon color="success" />
                <Typography variant="body2" sx={{ color: 'green', fontSize: '12px' }}>
                  00.00DT
                </Typography>
              </Box>
            )}
            {IsLoggedIn && <UserDropdown />}
          </Box>
        </Toolbar>
      </Container>
    </Box>
  );
}

export default Navbar;
