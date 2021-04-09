import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  LinearProgress,
  Grid,
  Typography,
  TextField,
  TablePagination,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import UnelevatedButton from "common/buttons/UnelevatedButton";
import PaymentContext from "context/payment/PaymentContext";
import ContactContext from "context/contacts/ContactContext";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
  },
}));

export default function PhoneRechargeSelect() {
  const classes = useStyles();
  const {
    handleChangeOwnPHNumber,
    handleChangeConfirmOwnPHNumber,
  } = useContext(PaymentContext);
  const {
    loadingContacts,
    contacts,
    getContacts,
    params,
    handleParamsChange,
    handlePageChange,
  } = useContext(ContactContext);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const handleSelectContact = (contact) => {
    handleChangeOwnPHNumber(contact.contactInfo.phone);
    handleChangeConfirmOwnPHNumber(contact.contactInfo.phone);
    handleClose();
  };

  useEffect(() => {
    if (open) {
      getContacts();
    }
  }, [getContacts, open]);

  return (
    <>
      <IconButton aria-label="add contact" onClick={handleClickOpen}>
        <AddIcon />
      </IconButton>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <DialogTitle id="simple-dialog-title">
          Seleccione el contacto que va a recargar
        </DialogTitle>
        <DialogContent>
          <Grid style={{ height: 5, marginBottom: 10 }}>
            <LinearProgress hidden={!loadingContacts} />
          </Grid>
          <Grid item>
            <TextField
              name="name"
              variant="outlined"
              fullWidth
              label="Nombre"
              value={params.name || ""}
              onChange={handleParamsChange}
              helperText={
                <span>
                  Filtrar por <b>nombre</b>
                </span>
              }
            />
          </Grid>
          <List>
            {contacts?.data?.map((contact, index) => (
              <ListItem
                key={index}
                alignItems="flex-start"
                button
                onClick={() => handleSelectContact(contact)}
              >
                <ListItemAvatar>
                  <Avatar alt={contact.name} />
                </ListItemAvatar>
                <ListItemText
                  primary={contact.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        Contacto
                      </Typography>
                      {`— Mobil: ${contact.contactInfo?.phone}
                    \n Nauta: ${contact.contactInfo?.nautaEmail || "???"}`}
                    </React.Fragment>
                  }
                />
              </ListItem>
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
            {contacts?.data?.length > 0 && (
              <Grid
                className={classes.footer}
                item
                container
                justify="flex-end"
              >
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
          </List>
        </DialogContent>
        <DialogActions>
          <UnelevatedButton color="primary" onClick={handleClose}>
            Cerrar
          </UnelevatedButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
