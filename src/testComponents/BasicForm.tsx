import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import FormGroupHandler from "../context/FormGroupHandler";
import FormHandler from "../context/FormHandler";

export default function BasicForm() {
  const [text, setText] = useState("");

  return (
    <FormHandler>
      <FormGroupHandler
        name="basicForm"
        onSubmit={(data) => {
          setText(data?.test.value);
        }}
      >
        <Input name="test" placeholder="Test" />
        <Button type="submit">Submit</Button>
        <span>{text}</span>
      </FormGroupHandler>
    </FormHandler>
  );
}
