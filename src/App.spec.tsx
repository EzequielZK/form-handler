import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BasicForm from "./testComponents/BasicForm";
import MultipleForms from "./testComponents/MultipleForms";
import ValidationForm from "./testComponents/ValidationForm";

const BasicUsage = BasicForm;
const MultipleUsage = MultipleForms;

describe("Testing BasicForm structure", () => {
  it("should have an input with property placeholder equals to 'Test'", () => {
    const { getByPlaceholderText } = render(<BasicUsage />);

    const input = getByPlaceholderText("Test");

    expect(input).toBeInTheDocument();
  });

  it("should have a button with text equals to 'Submit'", () => {
    const { getByText } = render(<BasicUsage />);

    const submitButton = getByText("Submit");

    expect(submitButton).toBeInTheDocument();
  });
});

describe("Testing FormHandler context", () => {
  const basicTestingText = "Hello World";
  const multipleUsageName = "John";
  const multipleUsageAge = "25";
  const multipleUsageEmail = "john@example.com";

  it(`should render '${basicTestingText}' after submit`, () => {
    const { getByText, getByPlaceholderText, queryByText } = render(
      <BasicUsage />
    );

    const input = getByPlaceholderText("Test");
    const submitButton = getByText("Submit");
    const testingText = "Hello World";

    expect(queryByText(basicTestingText)).not.toBeInTheDocument();

    userEvent.type(input, testingText);
    userEvent.click(submitButton);

    expect(getByText(testingText)).toBeInTheDocument();
  });

  it(`should render data from 3 separate forms after submit`, () => {
    const { getByText, getByPlaceholderText, queryByText } = render(
      <MultipleUsage />
    );

    const nameInput = getByPlaceholderText("Name");
    const ageInput = getByPlaceholderText("Age");
    const emailInput = getByPlaceholderText("Email");
    const submitButton1 = getByText("Submit 1");
    const submitButton2 = getByText("Submit 2");
    const submitButton3 = getByText("Submit 3");

    expect(queryByText(`Name: ${multipleUsageName}`)).not.toBeInTheDocument();
    expect(queryByText(`Age: ${multipleUsageAge}`)).not.toBeInTheDocument();
    expect(queryByText(`Email: ${multipleUsageEmail}`)).not.toBeInTheDocument();

    userEvent.type(nameInput, multipleUsageName);
    userEvent.click(submitButton1);
    userEvent.type(ageInput, multipleUsageAge);
    userEvent.click(submitButton2);
    userEvent.type(emailInput, multipleUsageEmail);
    userEvent.click(submitButton3);

    expect(getByText(`Name: ${multipleUsageName}`)).toBeInTheDocument();
    expect(getByText(`Age: ${multipleUsageAge}`)).toBeInTheDocument();
    expect(getByText(`Email: ${multipleUsageEmail}`)).toBeInTheDocument();
  });
});

describe("Testing validations", () => {
  const errorMessage = "Invalid email";
  const wrongEmail = "email.com";
  const correctEmail = "email@example.com";
  const formInputErrors = "The following fields are incorrect:";
  const formRequiredFieldsErrors = "The following fields are empty:";
  const inputLabels = ["email1", "email2"];
  it(`should render '${errorMessage}' until input value be correct`, () => {
    const { getByText, getByPlaceholderText, queryByText } = render(
      <ValidationForm />
    );

    const testInput = getByPlaceholderText("Test");

    expect(queryByText(errorMessage)).not.toBeInTheDocument();
    userEvent.type(testInput, wrongEmail);
    expect(getByText(errorMessage)).toBeInTheDocument();

    userEvent.clear(testInput);
    expect(queryByText(errorMessage)).not.toBeInTheDocument();
    userEvent.type(testInput, correctEmail);
    expect(queryByText(errorMessage)).not.toBeInTheDocument();
  });

  it(`should render '${formInputErrors} ${inputLabels}' after submit`, () => {
    const { getByText, getByPlaceholderText } = render(
      <ValidationForm
        inputErrorMessage={formInputErrors}
        requiredErrorMessage={formRequiredFieldsErrors}
        inputLabels={inputLabels}
      />
    );

    const email1Input = getByPlaceholderText(inputLabels[0]);
    const email2Input = getByPlaceholderText(inputLabels[1]);
    const submitButton = getByText("Submit");

    userEvent.type(email1Input, wrongEmail);
    userEvent.type(email2Input, wrongEmail);
    userEvent.click(submitButton);
    expect(getByText(`${formInputErrors} ${inputLabels}`)).toBeInTheDocument();
  });
});

export {};
