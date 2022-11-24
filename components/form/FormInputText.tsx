import { TextField, FormControl } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import React, { FunctionComponent } from "react";

type FormInputTextProps = {
  name: string;
  label: string;
};

export const FormInputText: FunctionComponent<FormInputTextProps> = ({
  name,
  label,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl
          sx={{ display: "flex", width: "100%" }}
        >
          <TextField
            error={!!errors[name]}
            {...field}
            sx={{ flexGrow: 1, backgroundColor: "#ffffff" }}
            label={label}
          />
        </FormControl>
      )}
    />
  );
};
