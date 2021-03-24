import React, { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import PropTypes from "prop-types";

export default function PasswordInput({
  value,
  label,
  onChange,
  helperText,
  variant,
  error,
  name,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <TextField
      {...props}
      name={name}
      value={value}
      type={showPassword ? "text" : "password"}
      label={label}
      onChange={onChange}
      helperText={helperText}
      autoComplete={"current-password"}
      fullWidth
      variant={variant}
      error={error}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

PasswordInput.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  helperText: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
};
