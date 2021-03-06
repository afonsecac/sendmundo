import React, { useContext, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import Promotions from "modules/payment/components/Promotions";
import PhoneRechar from "modules/payment/components/PhoneRechar";
import PaymentMethod from "modules/payment/components/PaymentMethod";

import PaymentContext from "context/payment/PaymentContext";
import HomeContext from "context/home/HomeContext";
import ContactContext from "context/contacts/ContactContext";

import isEmpty from "validations/is-empty";
import UnelevatedButton from "common/buttons/UnelevatedButton";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  card: {
    minWidth: 275,
  },
}));

function getSteps() {
  return ["Seleccione una oferta", "Teléfono a recargar", "Método de pago"];
}

export default function PaymentStepper() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const {
    ownPhoneNumber,
    confirmOwnPhoneNumber,
    paymentCompleted,
    handleResetAndClear,
    checkAddContact,
    newContactName,
    handleChangeAddContact,
  } = useContext(PaymentContext);
  const { promotionSelected, clearPromotions } = useContext(HomeContext);
  const { createContact } = useContext(ContactContext);

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if (activeStep === 0 && isEmpty(promotionSelected)) {
      enqueueSnackbar("Debe seleccionar una oferta", {
        variant: "error",
      });
    } else if (activeStep === 1 && isEmpty(ownPhoneNumber)) {
      enqueueSnackbar("Debe proporcionar un mobil", {
        variant: "error",
      });
    } else if (activeStep === 1 && ownPhoneNumber !== confirmOwnPhoneNumber) {
      enqueueSnackbar("Los mobiles deben cohincidir", {
        variant: "error",
      });
    } else if (activeStep === 1 && checkAddContact && !newContactName) {
      enqueueSnackbar("Para guardar el contacto debe llenar el nombre", {
        variant: "error",
      });
    } else if (activeStep === 2 && !paymentCompleted) {
      enqueueSnackbar("Aun no completa su pago", {
        variant: "error",
      });
    } else {
      if (activeStep === 1 && checkAddContact && newContactName) {
        createContact({
          name: newContactName,
          isFavorite: false,
          contactInfo: {
            phone: ownPhoneNumber,
            nautaEmail: "",
          },
        });
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
  };

  const handleBack = () => {
    if (activeStep === 2) {
      handleChangeAddContact(false);
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    handleResetAndClear();
    clearPromotions();
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Promotions />;
      case 1:
        return <PhoneRechar />;
      case 2:
        return <PaymentMethod />;
      default:
        return "Unknown step";
    }
  };

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      if (ownPhoneNumber && !isEmpty(promotionSelected)) {
        setActiveStep(2);
      } else if (!isEmpty(promotionSelected)) {
        setActiveStep(1);
      }
      firstRender.current = false;
    }
  }, [ownPhoneNumber, promotionSelected]);

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography
              align="center"
              className={classes.instructions}
              variant="h6"
            >
              Resumen
            </Typography>
            <Card className={classes.card}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  <b>Mobil recargado:</b> {ownPhoneNumber}
                </Typography>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  <b>Pagado:</b> {promotionSelected.basePrice} USD
                </Typography>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  <b>Recivido:</b> {promotionSelected.rechargeAmount} CUP
                </Typography>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  <b>Bono:</b> {promotionSelected.rechargeBonus}
                </Typography>
              </CardContent>
            </Card>
            <Grid container justify="flex-end">
              <UnelevatedButton
                onClick={handleReset}
                variant="contained"
                color="primary"
              >
                Reiniciar
              </UnelevatedButton>
            </Grid>
          </div>
        ) : (
          <div>
            {getStepContent(activeStep)}
            <Grid
              container
              justify="flex-end"
              style={{ marginTop: 20, marginBottom: 20 }}
            >
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Atrás
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
              </Button>
            </Grid>
          </div>
        )}
      </div>
    </div>
  );
}
