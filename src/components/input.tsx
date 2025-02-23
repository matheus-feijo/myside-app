import { RefObject } from "react";
import styles from "./input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  ref: RefObject<HTMLInputElement | null>;
}

export function Input({ name, ref, ...props }: InputProps) {
  return (
    <input
      type="text"
      id={name}
      name={name}
      {...props}
      className={styles.input}
      ref={ref}
    />
  );
}
