"use client";
import { Button } from "@/components/button";
import { Loading } from "@/components/loading";
import { useProduct } from "@/hooks/useProduct";
import { formatCurrency } from "@/utils/format-currency";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import styles from "./page.module.css";

export default function Page() {
  const { id } = useParams();
  const { getProductById } = useProduct();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(Number(id)).then((res) => res.product),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className={styles["feedback-container"]}>
        <Loading size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles["feedback-container"]}>
        <p>Erro ao carregar.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Imagem do produto */}
      <div className={styles["product-image"]}>
        <Image
          src={product?.image || ""}
          alt={`Imagem do produto ${product?.title}`}
          width={400}
          height={400}
          className={styles.image}
          loading="lazy"
        />
      </div>

      {/* Detalhes do produto */}
      <div className={styles["product-details"]}>
        <h1 className={styles["product-name"]}>{product?.title}</h1>
        <p className={styles["product-price"]}>
          {formatCurrency(product?.price || 0)}
        </p>
        <p className={styles["product-category"]}>
          <strong>Categoria:</strong> {product?.category}
        </p>
        <p className={styles["product-brand"]}>
          <strong>Marca:</strong> {product?.brand}
        </p>
        <p className={styles["product-description"]}>{product?.description}</p>
        <div className={styles["button-container"]}>
          <Button variant="secondary" onClick={() => window.history.back()}>
            Voltar
          </Button>
        </div>
      </div>
    </div>
  );
}
