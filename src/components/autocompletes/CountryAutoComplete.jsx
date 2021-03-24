import React, { useRef, useContext } from "react";
import { TextField, CircularProgress } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AuthContext from "context/auth/AuthContext";

export default function CountryAutoComplete({ handleChange, ...props }) {
  const { countries, loadingCountries, getCountries } = useContext(AuthContext);
  const timeoutId = useRef();

  const searchCountry = (event) => {
    const search = event.target.value;
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      getCountries(search);
    }, 1000);
  };

  return (
    <Autocomplete
      fullWidth
      getOptionSelected={(option, value) => option.name === value.name}
      onChange={(event, newValue) => {
        handleChange(newValue);
      }}
      getOptionLabel={(option) => option.name || ""}
      options={countries}
      loading={loadingCountries}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Escriba el nombre del pais"
          onChange={searchCountry}
          variant="outlined"
          {...props}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loadingCountries ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
