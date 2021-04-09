import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  IconButton,
  Tooltip,
  Grid,
  Typography,
  TextField,
  // FormControlLabel,
  // Checkbox,
} from "@material-ui/core";
import { FilterList, Close } from "@material-ui/icons";
import UnelevatedButton from "common/buttons/UnelevatedButton";
import ContactContext from "context/contacts/ContactContext";

const useStyles = makeStyles({
  form: {
    width: 280,
    margin: 15,
    overflowX: "hidden",
  },
});

export default function ContactListFilters() {
  const classes = useStyles();
  const { params, handleParamsChange, handleClearParamsChange } = useContext(
    ContactContext
  );
  const [open, setOpen] = useState(false);

  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(!open);
  };

  const handleClearParams = () => {
    handleClearParamsChange();
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Filtrar">
        <IconButton aria-label="filter" onClick={() => setOpen(true)}>
          <FilterList />
        </IconButton>
      </Tooltip>

      <Drawer anchor="right" open={open} onClose={toggleDrawer}>
        <Grid container direction="column" className={classes.form} spacing={1}>
          <Grid item>
            <Grid container alignItems="center">
              <Grid item>
                <Tooltip title="Cerrar">
                  <IconButton
                    aria-label="cerrar"
                    onClick={() => setOpen(false)}
                  >
                    <Close />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <Typography variant="body1" style={{ fontWeight: 600 }}>
                  Filtros
                </Typography>
              </Grid>
            </Grid>
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
          {/* <Grid item>
            <TextField
              name="phoneNumber"
              variant="outlined"
              fullWidth
              label="Mobil"
              value={params.phoneNumber || ""}
              onChange={handleParamsChange}
              helperText={
                <span>
                  Filtrar por <b>mobil</b>
                </span>
              }
            />
          </Grid> */}
          {/* <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  name="isFavorite"
                  value={params.isFavorite}
                  checked={params.isFavorite}
                  onChange={handleParamsChange}
                />
              }
              label="Es favorito"
              labelPlacement="end"
            />
          </Grid> */}
          <Grid item>
            <Grid item container justify="flex-end">
              <UnelevatedButton
                variant="contained"
                color="error"
                onClick={handleClearParams}
              >
                Limpiar
              </UnelevatedButton>
            </Grid>
          </Grid>
        </Grid>
      </Drawer>
    </>
  );
}
