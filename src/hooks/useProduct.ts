"use client";
import { IProduct } from "@/interfaces/IProduct";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

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
  const { data: products } = useQuery<IGetProductsResponse>({
    queryKey: ["products"],
    queryFn: () => api.get("/products").then((res) => res.data),
  });

  const getProductById = async (id: number) => {
    const { data } = await api.get<IGetProductByIdResponse>(`/products/${id}`);
    return data;
  };

  return { products, getProductById };
};
