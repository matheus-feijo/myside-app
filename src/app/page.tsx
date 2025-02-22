"use client";
import { Button } from "@/components/button";
import { useProduct } from "@/hooks/useProduct";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import styles from "./page.module.css";

export default function Page() {
  const { products } = useProduct();
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToProduct = (id: number) => {
    router.push(`/${id}`);
  };

  const handlePreviousPage = () => {
    const currentPage = parseInt(searchParams.get("page") || "1");
    const previousPage = currentPage - 1;
    router.push(`/?page=${previousPage}`);
  };

  const handleNextPage = () => {
    const currentPage = parseInt(searchParams.get("page") || "1");
    const nextPage = currentPage + 1;
    router.push(`/?page=${nextPage}`);
  };

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <main className={styles["main-page"]}>
        <h1 className={styles["title-page"]}>Produtos</h1>
        <div className={styles.divider} />
        <ol className={styles["list-products"]}>
          {products?.products.map((product) => (
            <li
              key={product.id}
              onClick={() => goToProduct(product.id)}
              className={styles["product-item"]}
            >
              <Image
                src={product.image}
                width={100}
                height={100}
                alt={`Imagem do produto ${product.title}`}
                loading="lazy"
              />
              <div className={styles["container-info-product"]}>
                <h2 className={styles["title-product"]}>{product.title}</h2>
                <span className={styles["price-product"]}>
                  Preço:{" "}
                  {product.price.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
                <p className={styles["description-product"]}>
                  {product.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className={styles.pagination}>
          <Button
            className={styles["page-button"]}
            onClick={handlePreviousPage}
            disabled={
              !searchParams.get("page") || searchParams.get("page") === "1"
            }
            variant="default"
          >
            <ChevronLeft width={16} /> Anterior
          </Button>

          {/* Como o endpoint nao informa o total de paginas, assumi que o maximo de itens é 150, de acordo
            com oque estava na documentação.
          */}
          <Button
            variant="primary"
            className={styles["page-button"]}
            onClick={handleNextPage}
            disabled={
              searchParams.get("page") === Math.ceil(150 / 10).toString()
            }
          >
            Próximo <ChevronRight width={16} />
          </Button>
        </div>
      </main>
    </Suspense>
  );
}
