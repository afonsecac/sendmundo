import React, { useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Toolbar,
  Button,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Hidden,
  useMediaQuery,
  useTheme,
  Tooltip,
} from "@material-ui/core";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import SendMUNDO_LOGO from "styles/imgs/SendMUNDO_LOGO.png";
import { Link as LinkR } from "react-router-dom";
import AuthContext from "context/auth/AuthContext";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    height: 120,
    // borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
    color: "#0073a7",
    fontWeight: 600,
  },
  iconButton: {
    color: "#0073a7",
  },
  buttonSession: {
    borderRadius: 25,
    color: "#fff",
    backgroundColor: "#ff9300",
    fontWeight: 600,
    "&:hover": {
      color: "#fff",
      backgroundColor: "#ff9300",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const { title } = props;
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const onLogout = () => {
    handleMenuClose();
    logout();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <IconButton color="inherit">
          <AccountBoxIcon />
        </IconButton>
        <Typography align="center" variant="body1">
          Perfil
        </Typography>
      </MenuItem>
      <MenuItem onClick={handleMenuClose} component={LinkR} to="/orders">
        <IconButton color="inherit">
          <ListAltIcon />
        </IconButton>
        <Typography align="center" variant="body1">
          Pedidos
        </Typography>
      </MenuItem>
      <MenuItem onClick={handleMenuClose} component={LinkR} to="/contacts">
        <IconButton color="inherit">
          <ContactPhoneIcon />
        </IconButton>
        <Typography align="center" variant="body1">
          Contactos
        </Typography>
      </MenuItem>
      <MenuItem onClick={onLogout}>
        <IconButton color="inherit">
          <ExitToAppIcon />
        </IconButton>
        <Typography align="center" variant="body1">
          Salir
        </Typography>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <IconButton color="inherit">
          <AccountBoxIcon />
        </IconButton>
        <Typography align="center" variant="body1">
          Perfil
        </Typography>
      </MenuItem>
      <MenuItem onClick={handleMenuClose} component={LinkR} to="/orders">
        <IconButton color="inherit">
          <ListAltIcon />
        </IconButton>
        <Typography align="center" variant="body1">
          Pedidos
        </Typography>
      </MenuItem>
      <MenuItem onClick={handleMenuClose} component={LinkR} to="/contacts">
        <IconButton color="inherit">
          <ContactPhoneIcon />
        </IconButton>
        <Typography align="center" variant="body1">
          Contactos
        </Typography>
      </MenuItem>
      <MenuItem onClick={onLogout}>
        <IconButton color="inherit">
          <ExitToAppIcon />
        </IconButton>
        <Typography align="center" variant="body1">
          Salir
        </Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <LinkR to="/">
          <img src={SendMUNDO_LOGO} alt="logApp" width={190} />
        </LinkR>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          <Hidden xsDown>
            <Grid container item justify="center" alignItems="center">
              <PhoneAndroidIcon /> {title}
            </Grid>
          </Hidden>
        </Typography>

        {isAuthenticated ? (
          <>
            <div className={classes.sectionDesktop}>
              <Typography
                align="center"
                variant="h6"
                className={classes.toolbarTitle}
              >
                {user.nickname}
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Typography>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </>
        ) : (
          <>
            <Tooltip title="Iniciar session">
              <Button
                variant="outlined"
                size="large"
                className={classes.buttonSession}
                component={LinkR}
                to="/login"
              >
                {matches ? "Iniciar.." : "Iniciar session"}
              </Button>
            </Tooltip>
            <Hidden xsDown>
              <IconButton className={classes.iconButton}>
                <FacebookIcon />
              </IconButton>
              <IconButton className={classes.iconButton}>
                <TwitterIcon />
              </IconButton>
            </Hidden>
          </>
        )}
      </Toolbar>
      {renderMobileMenu}
      {renderMenu}
    </React.Fragment>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
