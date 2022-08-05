import { useContext } from "react";
import { FormHandlerContext, InitialInputParams } from "../context/FormHandler";

export function useFormHandler(groupName: string) {
  const formHandlerContext = useContext(FormHandlerContext);
  const forms = formHandlerContext.forms[groupName] ?? {};

  const setValue = (name: string, value: any) => {
    formHandlerContext.setValue(groupName, name, value);
  };

  const setError = (name: string, errorMessage: string | null) => {
    formHandlerContext.setError(groupName, name, errorMessage);
  };

  const clear = () => {
    formHandlerContext.clear(groupName);
  };

  const getInitialForms = ({
    name,
    required,
    label,
    defaultValue,
  }: InitialInputParams) => {
    formHandlerContext.getInitialForms({
      groupName,
      name,
      required,
      label,
      defaultValue,
    });
  };

  return {
    ...formHandlerContext,
    getInitialForms,
    setValue,
    setError,
    forms,
    clear,
  };
}
