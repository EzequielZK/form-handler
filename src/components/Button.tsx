import { MouseEvent, ReactNode, useContext } from "react";
import { FormGroupHandlerContext } from "../context/FormGroupHandler";

interface ButtonProps {
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: "submit" | "button" | "reset";
}

export default function Button({ children, onClick, type }: ButtonProps) {
  const { submit, hasContext } = useContext(FormGroupHandlerContext);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (hasContext && type === "submit") {
      submit();
    }
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button onClick={handleClick} type={type}>
      {children}
    </button>
  );
}
