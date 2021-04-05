import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { List, LinearProgress, Grid } from "@material-ui/core";
import ContactItem from "modules/contact/components/ContactItem";
import ContactForm from "modules/contact/components/ContactForm";
import ContactEditForm from "modules/contact/components/ContactEditForm";
import isEmpty from "validations/is-empty";

import ContactContext from "context/contacts/ContactContext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "60ch",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ContactList() {
  const classes = useStyles();
  const {
    loadingContacts,
    contacts,
    getContacts,
    selectedContact,
  } = useContext(ContactContext);

  useEffect(() => {
    getContacts();
  }, [getContacts]);

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Grid item style={{ height: 5 }}>
            <LinearProgress hidden={!loadingContacts} />
          </Grid>
          <List className={classes.root}>
            {contacts?.data
              ?.sort((a, b) => {
                return a === b ? 0 : a ? 1 : -1;
              })
              .map((contact, index) => (
                <ContactItem contact={contact} key={index} />
              ))}
          </List>
        </Grid>
        <Grid item xs={12} sm={4}>
          {isEmpty(selectedContact) ? <ContactForm /> : <ContactEditForm />}
        </Grid>
      </Grid>
    </>
  );
}
