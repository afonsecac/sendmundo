import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Toolbar,
  Button,
  IconButton,
  Typography,
} from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import SendMUNDO_LOGO from "styles/imgs/SendMUNDO_LOGO.png";
import { Link as LinkR } from "react-router-dom";

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
    minWidth: 178,
    borderRadius: 25,
    color: "#fff",
    backgroundColor: "#ff9300",
    fontWeight: 600,
    "&:hover": {
      color: "#fff",
      backgroundColor: "#ff9300",
    },
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const { title } = props;

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <LinkR to="/">
          <img src={SendMUNDO_LOGO} alt="logApp" width={220} />
        </LinkR>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          <Grid container item justify="center" alignItems="center">
            <PhoneAndroidIcon /> {title}
          </Grid>
        </Typography>
        <Button
          variant="outlined"
          size="large"
          className={classes.buttonSession}
          component={LinkR}
          to="/login"
        >
          Iniciar session
        </Button>
        <IconButton className={classes.iconButton}>
          <FacebookIcon />
        </IconButton>
        <IconButton className={classes.iconButton}>
          <TwitterIcon />
        </IconButton>
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
