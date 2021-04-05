import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import ContactList from "modules/contact/components/ContactList";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 8,
  },
}));

export default function ContactContainer() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid
        container
        direction="column"
        alignItems="stretch"
        className={classes.root}
      >
        <Grid item>
          <ContactList />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
