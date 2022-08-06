import { ReactNode, createContext } from "react";
import { useFormHandler } from "../hooks/useFormHandler";
import { FormInputs } from "./FormHandler";

type FormProps = {
  onSubmit?: (
    data: FormInputs | null,
    requiredMessage?: string,
    errorMessage?: string
  ) => void;
  requiredErrorMessage?: string;
  inputErrorMessage?: string;
  showRequiredLabelsOnError?: boolean;
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
  requiredErrorMessage,
  inputErrorMessage,
  showRequiredLabelsOnError,
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
    let requiredMessage = requiredErrorMessage;

    let key;

    for (key in forms) {
      const { required, value, label } = forms[key];

      if (!value && required) {
        setError(key, required);
        hasValue = false;

        if (showRequiredLabelsOnError) {
          requiredMessage += ` ${label}`;
        }
      }
    }
    return { hasValue, requiredMessage };
  }

  function validateInputErrors() {
    let inputValid = true;
    let error = inputErrorMessage;

    let key;

    for (key in forms) {
      const { errorMessage, label } = forms[key];

      if (errorMessage) {
        inputValid = false;
        if (showRequiredLabelsOnError) {
          error += ` ${label}`;
        }
      }
    }
    return { inputValid, error };
  }

  function submit(value: any) {
    const { hasValue, requiredMessage } = validateRequiredInputs();

    const { inputValid, error } = validateInputErrors();

    const valid = hasValue && inputValid;

    // let newForm = {};
    // let key;

    // for (key in forms) {
    //   newForm = { ...newForm, [key]: forms[key].value };
    // }
    if (onSubmit) {
      onSubmit(valid ? { ...forms, ...value } : null, requiredMessage, error);
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
