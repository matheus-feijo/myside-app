"use client";
import { Button } from "@/components/button";
import { CardItem } from "@/components/card-item";
import { Checkbox } from "@/components/checkbox";
import { Header } from "@/components/header";
import { Input } from "@/components/input";
import { Loading } from "@/components/loading";
import { Pagination } from "@/components/pagination";
import { RevealItem } from "@/components/reveal-item";
import { useProduct } from "@/hooks/useProduct";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import styles from "./page.module.css";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isLoadingProductList, productList, name, setName } = useProduct();

  const nameRef = useRef<HTMLInputElement>(null);

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
          <Button onClick={handleSearchByName} variant="primary">
            Buscar
          </Button>
        </div>

        <div className={styles["container-category"]}>
          <p>Categoria:</p>

          <div className={styles["container-category-checkbox"]}>
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

        {isLoadingProductList && (
          <div className={styles["container-feedback"]}>
            <Loading size="large" />
          </div>
        )}

        {!isLoadingProductList && (
          <>
            {productList.length === 0 && (
              <div className={styles["container-feedback"]}>
                <h1>Nenhum produto encontrado</h1>
              </div>
            )}

            {productList.length > 0 && (
              <>
                <ol className={styles["list-products"]}>
                  {productList.map((product) => (
                    <RevealItem key={product.id}>
                      <CardItem product={product} />
                    </RevealItem>
                  ))}
                </ol>

                {/* Pagination somente ativo quando nao tiver filtro pois API não possui suporte para 
                  paginação de produtos com filtros*/}

                {!name && !searchParams.get("category") && <Pagination />}
              </>
            )}
          </>
        )}
      </main>
    </>
  );
}
