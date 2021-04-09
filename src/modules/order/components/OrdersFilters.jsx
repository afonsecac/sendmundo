import React, { useState, useContext, useCallback } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  Drawer,
  Grid,
  TextField,
} from "@material-ui/core";
import { FilterList, Close } from "@material-ui/icons";
import * as moment from "moment";
import UnelevatedButton from "common/buttons/UnelevatedButton";
import DatePickerInput from "components/inputs/DatePickerInput";

import OrderContext from "context/order/OrderContext";

const useStyles = makeStyles((theme) => ({
  title: {
    flex: "1 1 100%",
  },
  form: {
    width: 280,
    margin: 15,
    overflowX: "hidden",
  },
}));

export default function OrdersFilters() {
  const classes = useStyles();

  const { params, handleParamsChange, handleClearParamsChange } = useContext(
    OrderContext
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

  const handleStartTimeChange = useCallback(
    (value) => {
      let m = moment(value);
      m.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
      handleParamsChange({
        target: { name: "startDate", value: m.toISOString() },
      });
    },
    [handleParamsChange]
  );

  const handleEndTimeChange = useCallback(
    (value) => {
      let m = moment(value);
      m.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
      handleParamsChange({
        target: { name: "endDate", value: m.toISOString() },
      });
    },
    [handleParamsChange]
  );

  return (
    <>
      <Toolbar>
        <Typography
          variant="h6"
          id="tableTitle"
          component="div"
          className={classes.title}
        >
          Listado de ordenes
        </Typography>
        <Tooltip title="Listado de filtros">
          <IconButton aria-label="filter list" onClick={() => setOpen(true)}>
            <FilterList />
          </IconButton>
        </Tooltip>
      </Toolbar>
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
              name="invoiceCode"
              variant="outlined"
              fullWidth
              label="Codigo"
              value={params.invoiceCode || ""}
              onChange={handleParamsChange}
              helperText={
                <span>
                  Filtrar por <b>codigo</b>
                </span>
              }
            />
          </Grid>
          <Grid item>
            <DatePickerInput
              value={params.startDate}
              inputVariant={"outlined"}
              label={"Seleccione la fecha inicial"}
              helperText={
                <span>
                  Filtrar ordenes por <b>Fecha Incial</b>
                </span>
              }
              FormHelperTextProps={{
                component: Typography,
                noWrap: true,
              }}
              handleChange={handleStartTimeChange}
            />
          </Grid>
          <Grid item>
            <DatePickerInput
              value={params.endDate}
              inputVariant={"outlined"}
              label={"Seleccione la fecha final"}
              helperText={
                <span>
                  Filtrar ordenes por <b>Fecha Final</b>
                </span>
              }
              FormHelperTextProps={{
                component: Typography,
                noWrap: true,
              }}
              handleChange={handleEndTimeChange}
            />
          </Grid>
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
