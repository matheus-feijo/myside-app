import styles from "./checkbox.module.css"; // Importa os estilos do CSS Module

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export function Checkbox({ name, ...props }: CheckboxProps) {
  return (
    <div className={styles.customCheckbox}>
      <input type="checkbox" id={name} name={name} {...props} />{" "}
      <label htmlFor={name}>{name}</label>
    </div>
  );
}
