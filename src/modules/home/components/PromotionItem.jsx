import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 170,
    border: "2px solid #0073a7",
  },
  cardContent: {
    color: "#0073a7",
  },
  promotionCardLetter: {
    color: "#f98400",
  },
  cardFooter: {
    backgroundColor: "#0073a7",
    color: "#fff",
  },
}));

export default function PromotionItem({ promotion }) {
  const classes = useStyles();
  return (
    <Grid item>
      <Card className={classes.root} elevation={0}>
        <CardActionArea>
          <CardContent className={classes.cardContent}>
            <Typography
              align="center"
              variant="body1"
              style={{ fontWeight: 600 }}
            >
              Reciben
            </Typography>
            <Grid
              container
              justify="center"
              className={classes.promotionCardLetter}
            >
              <Typography
                align="left"
                variant="h5"
                style={{ fontWeight: 500, fontSize: 16 }}
              >
                $
              </Typography>
              <Typography
                align="center"
                variant="h5"
                style={{ fontWeight: 800 }}
              >
                {promotion.rechargeAmount}
              </Typography>
              <Typography
                align="right"
                variant="h5"
                style={{
                  fontWeight: 600,
                  fontSize: 14,
                  marginLeft: 5,
                }}
              >
                CUP
              </Typography>
            </Grid>
            <Typography align="center" variant="body1">
              + {promotion.rechargeBonus}
            </Typography>
            {promotion.promotionalPrice && (
              <Typography align="center" variant="body1">
                + {promotion.promotionalPrice}
              </Typography>
            )}
          </CardContent>
          <CardActions className={classes.cardFooter}>
            <Grid container justify="center">
              <Typography
                align="center"
                variant="body1"
                style={{ fontWeight: 600 }}
              >
                Pagas $ {promotion.basePrice} USD
              </Typography>
            </Grid>
          </CardActions>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
