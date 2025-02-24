import styles from "./checkbox.module.css"; // Importa os estilos do CSS Module

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export function Checkbox({ name, ...props }: CheckboxProps) {
  return (
    <label className={styles["checkbox-container"]}>
      <input
        type="checkbox"
        id={name}
        name={name}
        {...props}
        className={styles["checkbox-input"]}
      />{" "}
      <span className={styles["checkbox-custom"]}></span>
      <span className={styles.label}>{name}</span>
    </label>
  );
}
