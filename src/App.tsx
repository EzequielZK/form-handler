import { ValidationResponse } from "./globalTypes/types";
import registerValidations from "./hooks/registerValidations";
import ValidationForm from "./testComponents/ValidationForm";

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
registerValidations({ isEmail });
const formInputErrors = "The follwing fields are incorrect:";
const formRequiredFieldsErrors = "The follwing fields are empty:";
const inputLabels = ["email1", "email2"];
function App() {
  return (
    <ValidationForm
      inputErrorMessage={formInputErrors}
      requiredErrorMessage={formRequiredFieldsErrors}
      inputLabels={inputLabels}
    />
  );
}

export default App;
