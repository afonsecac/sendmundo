import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  LinearProgress,
  Grid,
  TablePagination,
  Typography,
} from "@material-ui/core";
import ContactItem from "modules/contact/components/ContactItem";
import ContactForm from "modules/contact/components/ContactForm";
import ContactEditForm from "modules/contact/components/ContactEditForm";
import ContactListFilters from "modules/contact/components/ContactListFilters";
import isEmpty from "validations/is-empty";

import ContactContext from "context/contacts/ContactContext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // maxWidth: "60ch",
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
    handlePageChange,
    params,
  } = useContext(ContactContext);

  useEffect(() => {
    getContacts();
  }, [getContacts]);

  return (
    <>
      <Grid container justify="space-around">
        <Grid item xs={12} sm={6}>
          <Grid item style={{ height: 5 }}>
            <LinearProgress hidden={!loadingContacts} />
          </Grid>
          <Grid item xs>
            <Grid item container justify="flex-end">
              <ContactListFilters />
            </Grid>
          </Grid>
          <List className={classes.root}>
            {contacts?.data
              ?.sort((a, b) => {
                return a === b ? 0 : a ? 1 : -1;
              })
              .map((contact, index) => (
                <ContactItem contact={contact} key={index} />
              ))}
            {contacts?.data?.length === 0 && (
              <Grid
                container
                justify="center"
                alignItems="center"
                style={{ height: "50vh" }}
              >
                <Typography style={{ fontWeight: 600 }}>
                  No se encontraron resultados
                </Typography>
              </Grid>
            )}
          </List>
          {contacts?.data?.length > 0 && (
            <Grid className={classes.footer} item container justify="flex-end">
              <Grid item>
                <TablePagination
                  labelRowsPerPage={""}
                  component={"div"}
                  rowsPerPageOptions={[4]}
                  page={contacts?.meta?.total === 0 ? 0 : params.page - 1}
                  count={contacts?.meta?.total || 0}
                  rowsPerPage={4}
                  onChangePage={handlePageChange}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid item xs={12} sm={4}>
          {isEmpty(selectedContact) ? <ContactForm /> : <ContactEditForm />}
        </Grid>
      </Grid>
    </>
  );
}
