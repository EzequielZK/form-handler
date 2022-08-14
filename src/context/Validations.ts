import { ValidationFunctions } from "../globalTypes/types";

export default class Validations {
  static instance = new this();
  #validations: ValidationFunctions = {};

  setValidations = (validations: ValidationFunctions) => {
    this.#validations = validations;
  };

  getValidations = () => {
    return this.#validations;
  };
}
