import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  LinearProgress,
} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

import OrderContext from "context/order/OrderContext";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  title: {
    flex: "1 1 100%",
  },
}));

export default function OrdersList() {
  const classes = useStyles();
  const { loadingOrders, orders, getOrders } = useContext(OrderContext);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  console.log(orders);

  return (
    <TableContainer component={Paper}>
      <div style={{ height: 5 }}>
        <LinearProgress hidden={!loadingOrders} />
      </div>
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
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Table className={classes.table} aria-label="table-orders">
        <TableHead>
          <TableRow>
            <TableCell>Fecha de Procesamiento</TableCell>
            <TableCell align="right">Estado</TableCell>
            <TableCell align="right">Precio</TableCell>
            <TableCell align="right">Moneda</TableCell>
            <TableCell align="right">Codigo</TableCell>
            <TableCell align="right">Producto</TableCell>
            <TableCell align="right">Transaccion de Pago</TableCell>
            <TableCell align="right">Transaccion de Referencia</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.data?.data?.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.processedAt}
              </TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.currency}</TableCell>
              <TableCell align="right">{row.invoiceCode}</TableCell>
              <TableCell align="right">
                {row.productValue || <ErrorOutlineIcon />}
              </TableCell>
              <TableCell align="right">
                {row.paymentTransaction || <ErrorOutlineIcon />}
              </TableCell>
              <TableCell align="right">
                {row.paymentReference || <ErrorOutlineIcon />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {orders?.data?.data?.length === 0 && (
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ height: "40vh" }}
        >
          <Typography style={{ fontWeight: 600 }} variant="body1">
            No se encontraron datos.
          </Typography>
        </Grid>
      )}
    </TableContainer>
  );
}
