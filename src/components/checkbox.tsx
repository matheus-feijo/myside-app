import styles from "./checkbox.module.css"; // Importa os estilos do CSS Module

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export function Checkbox({ name, ...props }: CheckboxProps) {
  return (
    <label className={styles.checkboxContainer}>
      <input
        type="checkbox"
        id={name}
        name={name}
        {...props}
        className={styles.checkboxInput}
      />{" "}
      <span className={styles.checkboxCustom}></span>
      <span className={styles.label}>{name}</span>
    </label>
  );
}
