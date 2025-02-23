"use client";
import { Button } from "@/components/button";
import { CardItem } from "@/components/card-item";
import { Header } from "@/components/header";
import { Input } from "@/components/input";
import { Loading } from "@/components/loading";
import { Pagination } from "@/components/pagination";
import { IProduct } from "@/interfaces/IProduct";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { Frown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import styles from "./page.module.css";

export default function Page() {
  const searchParams = useSearchParams();

  const [name, setName] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", searchParams.get("page"), name],
    queryFn: async () => {
      if (name) {
        const { data } = await api.get<{
          products: IProduct[];
        }>("/products");

        const filteredProducts = data.products.filter((product) =>
          product.title.toLowerCase().includes(name.toLowerCase())
        );

        return filteredProducts;
      }

      const { data } = await api.get<{
        products: IProduct[];
      }>(`/products?limit=10&page=${searchParams.get("page") || 1}`);

      return data.products;
    },
    initialData: [],
  });

  const handleSearchByName = () => {
    setName(nameRef.current?.value || "");
  };

  return (
    <>
      <Header />

      <main className={styles.main}>
        <div className={styles["container-search-product"]}>
          <Input
            ref={nameRef}
            name="name"
            placeholder="Digite o nome do produto"
          />
          <Button onClick={handleSearchByName}>Buscar</Button>
        </div>

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

        {!isLoading && !isError && products.length > 0 && (
          <>
            <ol className={styles["list-products"]}>
              {products?.map((product) => (
                <CardItem key={product.id} product={product} />
              ))}
            </ol>

            <Pagination />
          </>
        )}

        {!isLoading && !isError && name && products.length === 0 && (
          <div className={styles["container-feedback"]}>
            <p className={styles["message-product-not-found"]}>
              Nenhum Produto Encontrado. <Frown />
            </p>
          </div>
        )}
      </main>
    </>
  );
}
