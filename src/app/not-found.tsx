"use client";
import { Button } from "@/components/button";
import styles from "./page.module.css";

export default function NotFound() {
  return (
    <div className={styles["container-feedback"]}>
      <h1>Página não encontrada</h1>
      <Button variant="primary" onClick={() => window.history.back()}>
        Voltar
      </Button>
    </div>
  );
}
