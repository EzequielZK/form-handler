import {
  ReactNode,
  useTransition,
  useCallback,
  useState,
  createContext,
} from "react";
import { IndexableObject } from "../globalTypes/types";

type Forms = IndexableObject<FormInputs>;

export type FormInputs = IndexableObject<FormData>;

export type FormData = {
  value?: any;
  errorMessage?: string | null;
  loading?: boolean;
  required?: string;
  label?: string;
  defaultValue?: string;
};

export type InitialInputParams = Omit<FormData, "errorMessage"> & {
  groupName: string;
  name: string;
};

type FormProps = {
  onSubmit?: (forms: FormInputs) => void;
  children: ReactNode;
};

type FormHandlerProvider = {
  getInitialForms: (params: InitialInputParams) => void;
  setValue: (groupName: string, name: string, value: any) => void;
  setError: (
    groupName: string,
    name: string,
    errorMessage: string | null
  ) => void;
  clear: (groupName: string) => void;
  submit: () => void;
  forms: Forms;
};

export const FormHandlerContext = createContext({} as FormHandlerProvider);

export default function FormHandler({ children, onSubmit }: FormProps) {
  const [forms, setForms] = useState<Forms>({});
  const [loading, setTransition] = useTransition();

  const getInitialForms = useCallback(
    ({
      groupName,
      name,
      required,
      label,
      loading,
      defaultValue,
    }: InitialInputParams) => {
      if (!forms[groupName]?.[name]) {
        setFormInputs(groupName, name, {
          value: defaultValue,
          errorMessage: null,
          loading,
          required,
          label,
        });
      }
    },
    [forms]
  );

  const setFormInputs = (groupName: string, name: string, data: FormData) => {
    setForms((state: Forms) => {
      const newState = { ...state };
      newState[groupName] = {
        ...newState[groupName],
        [name]: { ...newState[groupName]?.[name], ...data },
      };
      return { ...newState };
    });
  };

  const setValue = useCallback(
    (groupName: string, name: string, value: any) => {
      setFormInputs(groupName, name, { value });
    },
    []
  );

  const setError = useCallback(
    (groupName: string, name: string, errorMessage: string | null) => {
      setFormInputs(groupName, name, { errorMessage });
    },
    []
  );

  const clear = (groupName: string) => {
    setTransition(() => {
      setForms((state: Forms) => {
        let newState = { ...state };
        let key;

        for (key in newState[groupName]) {
          const input = newState[groupName][key];
          input.value = "";
          input.errorMessage = null;

          newState[groupName][key] = input;
        }
        return { ...newState };
      });
    });
  };

  const submit = useCallback(() => {
    if (onSubmit) {
      let newForm = {};
      let key;

      for (key in forms) {
        const item = forms[key];

        newForm = { ...newForm, ...item };
      }

      onSubmit(newForm);
    }
  }, [onSubmit, forms]);

  return (
    <FormHandlerContext.Provider
      value={{ forms, setValue, getInitialForms, setError, clear, submit }}
    >
      {children}
    </FormHandlerContext.Provider>
  );
}
