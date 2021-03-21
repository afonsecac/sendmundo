import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#e9f6f8",
    padding: 50,
  },
  title: {
    fontWeight: 600,
    color: "#828282",
    // whiteSpace: "nowrap",
    // overflow: "hidden",
    "&::before": {
      content: "''",
      width: 200,
      display: "inline-block",
      height: 4,
      backgroundColor: "#0073a7",
      marginRight: 5,
    },
    "&::after": {
      content: "''",
      width: 200,
      display: "inline-block",
      height: 4,
      backgroundColor: "#0073a7",
      marginLeft: 5,
    },
  },
  titleSub: {
    fontWeight: 600,
    color: "#0073a7",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function CommonQuestion() {
  const classes = useStyles();
  return (
    <Grid container direction="column" className={classes.root} spacing={2}>
      <Grid container item justify="center">
        <Typography className={classes.title}>FAQ</Typography>
      </Grid>
      <Grid container item justify="center">
        <Typography variant="h5" className={classes.titleSub}>
          Las Preguntas mas frecuentes
        </Typography>
      </Grid>
      <Grid container item justify="center" spacing={2}>
        <Grid item xs={12} sm={4}>
          <Accordion elevation={0}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                Que son las recargas a cuba
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Accordion elevation={0}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                Cuanto duran las recargas
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
      <Grid container item justify="center" spacing={2}>
        <Grid item xs={12} sm={4}>
          <Accordion elevation={0}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                Recargas Cubacel con bono
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Accordion elevation={0}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                Con la recarga puedo comprar paquetes de datos
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
      <Grid container item justify="center" spacing={2}>
        <Grid item xs={12} sm={4}>
          <Accordion elevation={0}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                Que son las recargas
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Accordion elevation={0}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                Con las recargas puedo comprar paquetes de internet por datos?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </Grid>
  );
}
