"use client";
import { useProduct } from "@/hooks/useProduct";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();
  const { getProductById } = useProduct();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product"],
    queryFn: () => getProductById(Number(id)).then((res) => res.product),
    enabled: !!id,
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar</div>;
  }

  return (
    <div>
      <main>
        <h1>{product?.title}</h1>
        <p>{product?.category}</p>

        <Image
          src={product?.image || ""}
          alt={`Imagem do produto ${product?.title}`}
          width={100}
          height={100}
        />

        <p>{product?.price}</p>

        <p>{product?.description}</p>

        <p>{product?.brand}</p>
      </main>
    </div>
  );
}
