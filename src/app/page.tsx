"use client";
import { Button } from "@/components/button";
import { CardItem } from "@/components/card-item";
import { Checkbox } from "@/components/checkbox";
import { Header } from "@/components/header";
import { Input } from "@/components/input";
import { Loading } from "@/components/loading";
import { Pagination } from "@/components/pagination";
import { RevealItem } from "@/components/reveal-item";
import { IProduct } from "@/interfaces/IProduct";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { Frown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import styles from "./page.module.css";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [
      "products",
      searchParams.get("category"),
      searchParams.get("page"),
      name,
    ],
    queryFn: async () => {
      if (name && !searchParams.get("category")) {
        const { data } = await api.get<{
          products: IProduct[];
        }>("/products");

        const filteredProducts = data.products.filter((product) =>
          product.title.toLowerCase().includes(name.toLowerCase())
        );

        return filteredProducts;
      }

      if (searchParams.get("category")) {
        const { data } = await api.get<{
          products: IProduct[];
        }>(`/products/category?type=${searchParams.get("category")}`);

        const filteredProducts = name
          ? data.products.filter((product) =>
              product.title.toLowerCase().includes(name.toLowerCase())
            )
          : data.products;

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

  const handleSearchByCategory = (category: string) => {
    if (category === searchParams.get("category")) {
      router.push(`/`);
      return;
    }

    router.push(`/?category=${category}`);
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

        <div className={styles["container-category"]}>
          <p>Categoria:</p>

          <div className={styles["container-category"]}>
            <Checkbox
              onChange={() => handleSearchByCategory("tv")}
              name="tv"
              checked={searchParams.get("category") === "tv"}
            />
            <Checkbox
              onChange={() => handleSearchByCategory("mobile")}
              name="mobile"
              checked={searchParams.get("category") === "mobile"}
            />
            <Checkbox
              onChange={() => handleSearchByCategory("gaming")}
              name="gaming"
              checked={searchParams.get("category") === "gaming"}
            />
            <Checkbox
              onChange={() => handleSearchByCategory("appliance")}
              name="appliance"
              checked={searchParams.get("category") === "appliance"}
            />
          </div>
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
                <RevealItem key={product.id}>
                  <CardItem product={product} />
                </RevealItem>
              ))}
            </ol>

            {/* Pagination somente ativo quando nao tiver filtro pois API não possui suporte para 
              paginação de produtos com filtros
            */}
            {(searchParams.get("page") || !searchParams.get("category")) && (
              <Pagination />
            )}
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
