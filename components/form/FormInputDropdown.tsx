import React, { FunctionComponent } from "react";
import { FormControl, FormLabel, MenuItem, Select } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type Option = {
  label: string;
  value: string;
};

type FormInputDropdownProps = {
  name: string;
  label: string;
  options: Option[];
  onChangeCallback?: Function;
};

export const FormInputDropdown: FunctionComponent<FormInputDropdownProps> = ({
  name,
  label,
  options,
  onChangeCallback,
}) => {
  const generateSelectOptions = () => {
    return options.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  const {
    control,
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <FormControl>
          <FormLabel sx={{margin: "0.25rem 0"}}>{label}</FormLabel>
          <Select
            onChange={(event) => {
              onChange(event);
              onChangeCallback ? onChangeCallback(event.target.value) : null;
            }}
            value={value}
          >
            {generateSelectOptions()}
          </Select>
        </FormControl>
      )}
    />
  );
};
