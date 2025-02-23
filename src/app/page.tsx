"use client";
import { Button } from "@/components/button";
import { CardItem } from "@/components/card-item";
import { Header } from "@/components/header";
import { Loading } from "@/components/loading";
import { Pagination } from "@/components/pagination";
import { IProduct } from "@/interfaces/IProduct";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";

export default function Page() {
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

  return (
    <>
      <Header />

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
                <CardItem key={product.id} product={product} />
              ))}
            </ol>

            <Pagination />
          </>
        )}
      </main>
    </>
  );
}
