import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";

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

export default function PhoneCodeAutoComplete({ handleChange, ...props }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [selectedOpt, setSelectedOpt] = React.useState();

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await fetch("https://restcountries.eu/rest/v2/all");
      const countries = await response.json();
      if (active) {
        setOptions(countries);
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
      getOptionLabel={(option) => `+${option?.callingCodes[0]}`}
      options={options}
      renderOption={(option) => (
        <React.Fragment>
          {option && (
            <>
              <span>
                <img src={option.flag} width={20} alt="flag" />
              </span>
              +{option.callingCodes[0]}
            </>
          )}
        </React.Fragment>
      )}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Codigo"
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
