import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

export default function DatePickerInput({
  value,
  handleChange,
  inputVariant,
  label,
  margin = "normal",
  ...others
}) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        autoOk
        clearable
        margin={margin}
        label={label}
        value={value}
        onChange={handleChange}
        inputVariant={inputVariant}
        maxDate={new Date()}
        minDate={new Date("2018-01-01")}
        format="MMM/dd/yyyy"
        fullWidth
        {...others}
      />
    </MuiPickersUtilsProvider>
  );
}
