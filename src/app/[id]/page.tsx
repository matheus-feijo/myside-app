"use client";
import { useProduct } from "@/hooks/useProduct";
import { useQuery } from "@tanstack/react-query";
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
    queryFn: () => getProductById(Number(id)),
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
      <main>{product?.product.title}</main>
    </div>
  );
}
