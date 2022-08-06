import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import FormGroupHandler from "../context/FormGroupHandler";
import FormHandler from "../context/FormHandler";

type TestForm = {
  name?: string;
  age?: string;
  email?: string;
};

export default function MultipleForms() {
  const [form, setForm] = useState<TestForm>({});

  return (
    <FormHandler
      onSubmit={(data) =>
        setForm({
          name: data.name.value,
          age: data.age.value,
          email: data.email.value,
        })
      }
    >
      <FormGroupHandler name="nameForm">
        <Input name="name" placeholder="Name" />
        <Button type="submit">Submit 1</Button>
      </FormGroupHandler>
      <FormGroupHandler name="ageForm">
        <Input name="age" placeholder="Age" />
        <Button type="submit">Submit 2</Button>
      </FormGroupHandler>
      <FormGroupHandler name="emailForm" submitForm>
        <Input name="email" placeholder="Email" />
        <Button type="submit">Submit 3</Button>
      </FormGroupHandler>
      <span>Name: {form.name}</span>
      <span>Age: {form.age}</span>
      <span>Email: {form.email}</span>
    </FormHandler>
  );
}
