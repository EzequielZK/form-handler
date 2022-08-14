import React, { useEffect } from "react";
import { useFormGroupHandler } from "../hooks/useFormGroupHandler";

export type InputProps = {
  name: string;
  //   mask?: MaskTypes;
  validation?: "isEmail";
  defaultValue?: any;
  maxLength?: number;
  label?: string;
  helperText?: string;
  placeholder?: string;
  //   mask,
  //   validation,
  required?: string;
};

export default function Input({
  label,
  name,
  defaultValue = "",
  helperText,
  //   mask,
  validation,
  placeholder,
  required,
  maxLength,
}: InputProps) {
  const { setValue, setError, data } = useFormGroupHandler({
    name,
    required,
    label,
    defaultValue,
    validation,
  });

  const { value, errorMessage } = data;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: newValue } = event.target;

    setValue(newValue);
    if (!newValue) {
      if (errorMessage) {
        setError(null);
      }
    }
  };

  return (
    <div>
      <input value={value} onChange={handleChange} placeholder={placeholder} />
      {errorMessage && <span>{errorMessage}</span>}
    </div>
  );
}
