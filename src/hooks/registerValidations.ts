import Validations from "../context/Validations";
import { ValidationFunctions } from "../globalTypes/types";

export default function registerValidations(validations: ValidationFunctions) {
  Validations.instance.setValidations(validations);
}
