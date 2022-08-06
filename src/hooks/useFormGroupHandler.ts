import { useContext, useEffect } from "react";
import { FormGroupHandlerContext } from "../context/FormGroupHandler";

export function useFormGroupHandler({
  name,
  required,
  label,
  defaultValue,
}: any) {
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
    formGroupHandlerContext.setValue(name, value);
  };

  return {
    ...formGroupHandlerContext,
    setError,
    setValue,
    data,
  };
}
