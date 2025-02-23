"use client";
import { Button } from "@/components/button";
import { Loading } from "@/components/loading";
import { IProduct } from "@/interfaces/IProduct";
import { api } from "@/services/api";
import { formatCurrency } from "@/utils/format-currency";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.css";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", searchParams.get("page")],
    queryFn: async () => {
      const { data } = await api.get<{
        products: IProduct[];
      }>(`/products?limit=10&page=${searchParams.get("page") || 1}`);

      return data.products;
    },
  });

  const goToProduct = (id: number) => {
    router.push(`/${id}`);
  };

  const handlePreviousPage = () => {
    scrollTo({
      behavior: "smooth",
      top: 0,
    });
    const currentPage = parseInt(searchParams.get("page") || "1");
    const previousPage = currentPage - 1;
    router.push(`/?page=${previousPage}`);
  };

  const handleNextPage = () => {
    scrollTo({
      behavior: "smooth",
      top: 0,
    });
    const currentPage = parseInt(searchParams.get("page") || "1");
    const nextPage = currentPage + 1;
    router.push(`/?page=${nextPage}`);
  };

  return (
    <div>
      <header className={styles.header}>
        <h1>Produtos</h1>
      </header>

      <main className={styles.main}>
        {isLoading && (
          <div className={styles["container-feedback"]}>
            <Loading size="large" />
          </div>
        )}

        {!isLoading && isError && (
          <div className={styles["container-feedback"]}>
            <h1>Erro ao carregar</h1>
            <Button onClick={() => window.location.reload()}>
              Recarregar a página
            </Button>
          </div>
        )}

        {!isLoading && !isError && (
          <>
            <ol className={styles["list-products"]}>
              {products?.map((product) => (
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
                    className={styles.image}
                  />
                  <div className={styles["container-info-product"]}>
                    <h2 className={styles["title-product"]}>{product.title}</h2>
                    <span className={styles["price-product"]}>
                      Preço: {formatCurrency(product.price)}
                    </span>
                    <p className={styles["description-product"]}>
                      {product.description.length > 200
                        ? product.description.substring(0, 200) + "..."
                        : product.description}
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
          </>
        )}
      </main>
    </div>
  );
}
