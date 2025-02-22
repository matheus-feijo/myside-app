import styles from "./Loading.module.css";

type LoadingProps = {
  size?: "small" | "medium" | "large";
  className?: string;
};

export function Loading({ size = "medium", className = "" }: LoadingProps) {
  return <div className={`${styles.loader} ${styles[size]} ${className}`} />;
}
