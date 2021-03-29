import React, { useContext, useEffect } from "react";
import { Grid, LinearProgress } from "@material-ui/core";
import PromotionItem from "modules/home/components/PromotionItem";
import HomeContext from "context/home/HomeContext";

export default function Promotions() {
  const { loadingPromotions, promotions, getPromotions } = useContext(
    HomeContext
  );

  useEffect(() => {
    getPromotions({});
  }, [getPromotions]);

  return (
    <Grid item>
      <Grid item style={{ height: 5 }}>
        <LinearProgress hidden={!loadingPromotions} />
      </Grid>
      <Grid container spacing={1}>
        {promotions.map((promotion, index) => (
          <PromotionItem promotion={promotion} key={index} />
        ))}
      </Grid>
    </Grid>
  );
}
