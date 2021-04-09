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
  TablePagination,
  Paper,
  Typography,
  LinearProgress,
} from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

import OrderContext from "context/order/OrderContext";

import { formatDate } from "utils/utils";
import {
  greenMantis,
  yellow,
  redPersimmon,
  blueEbonyClay,
} from "utils/palette";
import OrdersFilters from "modules/order/components/OrdersFilters";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));

export default function OrdersList() {
  const classes = useStyles();
  const {
    loadingOrders,
    orders,
    getOrders,
    params,
    handlePageChange,
  } = useContext(OrderContext);

  const getStatus = (status) => {
    switch (status) {
      case "STANDYBY":
        return (
          <Typography
            variant="body1"
            align="center"
            noWrap
            style={{
              color: "#fff",
              backgroundColor: yellow,
              fontWeight: 600,
              padding: 5,
              borderRadius: 8,
            }}
          >
            EN ESPERA
          </Typography>
        );
      case "COMPLETED":
        return (
          <Typography
            variant="body1"
            align="center"
            style={{
              color: "#fff",
              backgroundColor: greenMantis,
              fontWeight: 600,
              padding: 5,
              borderRadius: 8,
            }}
          >
            COMPLETADO
          </Typography>
        );
      case "CANCELLED":
        return (
          <Typography
            variant="body1"
            align="center"
            style={{
              color: "#fff",
              backgroundColor: redPersimmon,
              fontWeight: 600,
              padding: 5,
              borderRadius: 8,
            }}
          >
            CANCELADO
          </Typography>
        );
      case "RECHARGED":
        return (
          <Typography
            variant="body1"
            align="center"
            style={{
              color: "#fff",
              backgroundColor: blueEbonyClay,
              fontWeight: 600,
              padding: 5,
              borderRadius: 8,
            }}
          >
            RECARGADO
          </Typography>
        );

      default:
        break;
    }
  };

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <>
      <TableContainer component={Paper}>
        <div style={{ height: 5 }}>
          <LinearProgress hidden={!loadingOrders} />
        </div>
        <OrdersFilters />
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
                  {formatDate(row.processedAt)}
                </TableCell>
                <TableCell align="right">{getStatus(row.status)}</TableCell>
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
      {orders?.data?.data?.length > 0 && (
        <Grid className={classes.footer} item container justify="flex-end">
          <Grid item>
            <TablePagination
              labelRowsPerPage={""}
              component={"div"}
              rowsPerPageOptions={[4]}
              page={orders?.data?.meta?.total === 0 ? 0 : params.page - 1}
              count={orders?.data?.meta?.total || 0}
              rowsPerPage={4}
              onChangePage={handlePageChange}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
}
