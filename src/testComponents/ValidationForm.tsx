import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import FormGroupHandler from "../context/FormGroupHandler";
import FormHandler from "../context/FormHandler";
import { IndexableObject, ValidationResponse } from "../globalTypes/types";
import registerValidations from "../hooks/registerValidations";

function isEmail(value?: string): ValidationResponse {
  if (!value) {
    return { error: null };
  }

  value.trim();

  const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value);

  return {
    error: validEmail ? null : "Invalid email",
  };
}

type ValidationFormProps = {
  inputErrorMessage?: string;
  requiredErrorMessage?: string;
  inputLabels?: string[];
};

export default function ValidationForm({
  inputErrorMessage,
  requiredErrorMessage,
  inputLabels,
}: ValidationFormProps) {
  const [error, setError] = useState<null | string>(null);
  const [required, setRequired] = useState<null | string>(null);

  registerValidations({ isEmail });

  const handleErrors = (
    data: any,
    errorFields: string[],
    requiredFields: string[]
  ) => {
    const errorMessage = `${inputErrorMessage} ${errorFields}`;
    const requiredMessage = `${requiredErrorMessage} ${requiredFields}`;
    
    if (requiredFields.length) {
        setError(requiredMessage);
      }
    else if (errorFields.length) {
      setError(errorMessage);
    }

  };

  return (
    <FormHandler>
      <FormGroupHandler name="validationForm" onSubmit={handleErrors}>
        {inputLabels ? (
          inputLabels.map((item) => (
            <Input
              required="required"
              key={item}
              name={item}
              label={item}
              placeholder={item}
              validation="isEmail"
            />
          ))
        ) : (
          <Input name="test" placeholder="Test" validation="isEmail" />
        )}

        <Button type="submit">Submit</Button>
        {error && <span>{error}</span>}
      </FormGroupHandler>
    </FormHandler>
  );
}
