import React, { useEffect } from "react";
import { useFormGroupHandler } from "../hooks/useFormGroupHandler";

export type InputProps = {
  name: string;
  //   mask?: MaskTypes;
  //   validation?: ValidationTypes;
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
  //   validation,
  placeholder,
  required,
  maxLength,
}: InputProps) {
  const { setValue, setError, data } = useFormGroupHandler({
    name,
    required,
    label,
    defaultValue,
  });

  const { value, errorMessage } = data;

  //   useEffect(() => {
  //     if (value) {
  //       validate();
  //     }
  //   }, [value]);

  //   let maskToUse: MaskFunctionType;
  //   let validationToTest: ValidationFunctionType;

  //   if (mask) {
  //     maskToUse = masks[mask];
  //   }

  //   if (validation) {
  //     validationToTest = validations[validation];
  //   }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: newValue } = event.target;

    setValue(
      //   maskToUse
      //     ? maskToUse(newValue)
      //     : maxLength
      //     ? newValue.substring(0, maxLength)
      //     : newValue
      newValue
    );
    if (!newValue) {
      if (errorMessage) {
        setError(null);
      }
    }
  };

  //   const validate = () => {
  //     if (validationToTest) {
  //       const { error } = validationToTest(value);
  //       setError(error);
  //     } else {
  //       if (errorMessage) {
  //         setError(null);
  //       }
  //     }
  //   };

  return (
    <>
      <input value={value} onChange={handleChange} placeholder={placeholder} />
    </>
  );
}
