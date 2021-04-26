import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import isEmpty from "validations/is-empty";

const useStyles = makeStyles((theme) => ({
  textField: {
    fontSize: 6,
    minWidth: 138,
    marginRight: 25,
    [`& fieldset`]: {
      borderRadius: 15,
      border: "2px solid #0073a7",
    },
  },
  multilineColor: {
    color: "#0073a7",
  },
  inputLabel: {
    color: "#0073a7",
    "&.focused": {
      color: "#0073a7",
    },
  },
}));

export default function PhoneCodeAutoComplete({
  handleChange,
  country,
  flag,
  ...props
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;
  const [selectedOpt, setSelectedOpt] = useState();

  useEffect(() => {
    if (!isEmpty(country)) {
      setSelectedOpt(country);
    }
  }, [country]);

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await fetch("https://restcountries.eu/rest/v2/all");
      const countries = await response.json();
      if (active) {
        setOptions(
          countries.sort((a, b) => {
            const labelA = a.translations["es"] || a.nativeName;
            const labelB = b.translations["es"] || b.nativeName;

            return labelA > labelB ? 1 : labelB > labelA ? -1 : 0;
          })
        );
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      value={selectedOpt || ""}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(event, newValue) => {
        setSelectedOpt(newValue);
        handleChange(newValue);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => {
        let label = "";
        if (!isEmpty(option) && option.callingCodes.length > 0)
          label = flag
            ? `+${option?.callingCodes[0]}`
            : option.translations["es"] || option.nativeName;
        return label;
      }}
      options={options}
      renderOption={(option) => (
        <React.Fragment>
          {option && (
            <>
              <span>
                <img src={option.flag} width={20} alt="flag" />
              </span>
              <span style={{ marginLeft: 10 }}>
                {flag
                  ? `+${option?.callingCodes[0]}`
                  : option.translations["es"] || option.nativeName}
              </span>
            </>
          )}
        </React.Fragment>
      )}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Busque un país"
          size="small"
          variant="outlined"
          className={classes.textField}
          InputLabelProps={{
            classes: {
              root: classes.inputLabel,
              focused: "focused",
            },
          }}
          InputProps={{
            className: classes.multilineColor,
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={8} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
            startAdornment: (
              <React.Fragment>
                {selectedOpt && (
                  <>
                    <span>
                      <img src={selectedOpt.flag} width={20} alt="flag" />
                    </span>
                  </>
                )}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

PhoneCodeAutoComplete.defaultProps = {
  flag: false,
};
