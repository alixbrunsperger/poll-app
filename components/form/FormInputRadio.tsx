import React, { FunctionComponent } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type Option = {
  label: string;
  value: string;
};

type FormInputRadioProps = {
  name: string;
  label: string;
  options: Option[];
};

export const FormInputRadio: FunctionComponent<FormInputRadioProps> = ({
  name,
  label,
  options,
}) => {
  const generateRadioOptions = () => {
    return options.map((singleOption: Option) => (
      <FormControlLabel
        key={singleOption.value}
        value={singleOption.value}
        label={singleOption.label}
        control={<Radio />}
      />
    ));
  };

  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl error={!!errors[name]}>
          <FormLabel>{label}</FormLabel>
          <RadioGroup {...field}>{generateRadioOptions()}</RadioGroup>
        </FormControl>
      )}
    />
  );
};
