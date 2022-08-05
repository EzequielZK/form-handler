import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BasicForm from "./testComponents/BasicForm";

const BasicUsage = BasicForm;

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
  it("should render 'Hello World' after submit", () => {
    const { getByText, getByPlaceholderText } = render(<BasicUsage />);

    const input = getByPlaceholderText("Test");
    const submitButton = getByText("Submit");
    const testingText = "Hello World";

    userEvent.type(input, testingText);
    userEvent.click(submitButton);

    expect(getByText(testingText)).toBeInTheDocument();
  });
});

export {};
