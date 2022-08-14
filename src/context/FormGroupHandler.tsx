import { ReactNode, createContext } from "react";
import { useFormHandler } from "../hooks/useFormHandler";
import { FormInputs } from "./FormHandler";

type FormProps = {
  onSubmit?: (
    data: FormInputs | null,
    errorFields: string[],
    requiredFields: string[]
  ) => void;
  name: string;
  clearOnSubmit?: boolean;
  children: ReactNode;
  submitForm?: boolean;
};

type FormGroupHandlerProvider = {
  submit: (value?: any) => void;
  getInitialForms: (params: any) => void;
  setValue: (name: string, value: any) => void;
  setError: (name: string, errorMessage: string | null) => void;
  hasContext: boolean;
  forms: FormInputs;
};

export const FormGroupHandlerContext = createContext(
  {} as FormGroupHandlerProvider
);

export default function FormGroupHandler({
  onSubmit,
  name,
  clearOnSubmit,
  submitForm,
  children,
}: FormProps) {
  const {
    forms,
    setValue,
    setError,
    getInitialForms,
    clear,
    submit: formSubmit,
  } = useFormHandler(name);

  const hasContext = true;

  function validateRequiredInputs() {
    let hasValue = true;
    const requiredFields = [];

    let key;

    for (key in forms) {
      const { required, value, label } = forms[key];

      if (!value && required) {
        setError(key, required);
        hasValue = false;
        if (label) {
          requiredFields.push(label);
        }
      }
    }
    return { hasValue, requiredFields };
  }

  function validateInputErrors() {
    let inputValid = true;
    const errorFields = [];

    let key;

    for (key in forms) {
      const { errorMessage, value, label } = forms[key];

      if (errorMessage && value) {
        inputValid = false;
        if (label) {
          errorFields.push(label);
        }
      }
    }
    return { inputValid, errorFields };
  }

  function submit(value: any) {
    const { hasValue, requiredFields } = validateRequiredInputs();

    const { inputValid, errorFields } = validateInputErrors();

    const valid = hasValue && inputValid;

    if (onSubmit) {
      onSubmit(
        valid ? { ...forms, ...value } : null,
        errorFields,
        requiredFields
      );
    }
    if (clearOnSubmit && valid) {
      clear();
    }
    if (submitForm && valid) {
      formSubmit();
    }
  }

  return (
    <FormGroupHandlerContext.Provider
      value={{ submit, forms, setValue, setError, getInitialForms, hasContext }}
    >
      {children}
    </FormGroupHandlerContext.Provider>
  );
}
