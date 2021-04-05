import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import UnelevatedButton from "common/buttons/UnelevatedButton";

import ContactContext from "context/contacts/ContactContext";

const useStyles = makeStyles((theme) => ({
  inline: {
    display: "inline",
  },
}));

export default function ContactItem({ contact }) {
  const classes = useStyles();
  const {
    loadingDeleteContact,
    deleteContact,
    selectContact,
    selectedContact,
  } = useContext(ContactContext);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteContact(contact, handleClose);
  };

  return (
    <>
      <ListItem
        alignItems="flex-start"
        button
        onClick={() => selectContact(contact)}
        selected={contact.id === selectedContact?.id}
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
              {`— Mobil: ${contact.contactInfo?.phone || "-"}
              \n Nauta: ${contact.contactInfo?.nautaEmail || "-"}`}
            </React.Fragment>
          }
        />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete" onClick={handleClickOpen}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="inset" component="li" />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Alerta"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esta seguro desea <b>eliminar</b> el contacto <b>{contact.name}</b>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <UnelevatedButton onClick={handleClose} color="primary">
            Cancelar
          </UnelevatedButton>
          <UnelevatedButton
            withProgress={loadingDeleteContact}
            onClick={handleDelete}
            color="secondary"
            autoFocus
          >
            Eliminar
          </UnelevatedButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
