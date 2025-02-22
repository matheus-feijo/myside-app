"use client";
import { IProduct } from "@/interfaces/IProduct";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

interface IGetProductsResponse {
  message: string;
  products: IProduct[];
  status: string;
}

interface IGetProductByIdResponse {
  message: string;
  product: IProduct;
  status: string;
}

export const useProduct = () => {
  const searchParams = useSearchParams();

  const { data: products } = useQuery<IGetProductsResponse>({
    queryKey: ["products", searchParams.get("page")],
    queryFn: () =>
      api
        .get(`/products?limit=10&page=${searchParams.get("page") || 1}`)
        .then((res) => res.data),
  });

  const getProductById = async (id: number) => {
    const { data } = await api.get<IGetProductByIdResponse>(`/products/${id}`);
    return data;
  };

  return { products, getProductById };
};
