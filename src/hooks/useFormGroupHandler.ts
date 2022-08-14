import { useContext, useEffect } from "react";
import { FormGroupHandlerContext } from "../context/FormGroupHandler";
import Validations from "../context/Validations";

type FormGroupHandlerHookProps = {
  name: string;
  required?: boolean | string;
  label?: string;
  defaultValue?: any;
  validation?: string;
};

export function useFormGroupHandler({
  name,
  required,
  label,
  defaultValue,
  validation,
}: FormGroupHandlerHookProps) {
  const formGroupHandlerContext = useContext(FormGroupHandlerContext);

  useEffect(() => {
    formGroupHandlerContext.getInitialForms({
      name,
      required,
      label,
      defaultValue,
    });
  }, [name, required, label, defaultValue, formGroupHandlerContext]);

  const data = formGroupHandlerContext.forms[name] ?? {
    value: defaultValue ?? "",
    errorMessage: null,
    required,
    label,
  };

  const setError = (errorMessage: string | null) => {
    formGroupHandlerContext.setError(name, errorMessage);
  };

  const setValue = (value: any) => {
    if (validation) {
      const validations = Validations.instance.getValidations();
      const validationToTest = validations[validation];
      const { error } = validationToTest(value);
      setError(error);
      formGroupHandlerContext.setValue(name, value);
    } else {
      formGroupHandlerContext.setValue(name, value);
    }
  };

  return {
    ...formGroupHandlerContext,
    setError,
    setValue,
    data,
  };
}
