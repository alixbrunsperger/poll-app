import React, { FunctionComponent, useEffect, useState } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type Option = { label: string; value: string };

type FormInputMultiCheckboxProps = {
  name: string;
  label: string;
  options: Option[];
};

export const FormInputMultiCheckbox: FunctionComponent<
  FormInputMultiCheckboxProps
> = ({ name, label, options }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  // we are handling the selection manually here
  const handleSelect = (value: string) => {
    const isPresent = selectedItems.indexOf(value);
    if (isPresent !== -1) {
      const remaining = selectedItems.filter((item: string) => item !== value);
      setSelectedItems(remaining);
    } else {
      setSelectedItems((prevItems: string[]) => [...prevItems, value]);
    }
  };

  // we are setting form value manually here
  useEffect(() => {
    setValue ? setValue(name, selectedItems) : null;
  }, [selectedItems, name, setValue]);

  return (
    <FormControl size={"small"} variant={"outlined"} error={!!errors[name]}>
      <FormLabel component="legend">{label}</FormLabel>
      {options.map((option: Option) => {
        return (
          <FormControlLabel
            control={
              <Controller
                name={name}
                render={({}) => {
                  return (
                    <Checkbox
                      checked={selectedItems.includes(option.value)}
                      onChange={() => handleSelect(option.value)}
                    />
                  );
                }}
                control={control}
              />
            }
            label={option.label}
            key={option.value}
          />
        );
      })}
    </FormControl>
  );
};
