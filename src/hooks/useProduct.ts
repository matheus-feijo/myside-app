"use client";
import { IProduct } from "@/interfaces/IProduct";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

interface IGetProductByIdResponse {
  message: string;
  product: IProduct;
  status: string;
}

export const useProduct = () => {
  const searchParams = useSearchParams();
  const [name, setName] = useState("");

  const { data: productList, isLoading: isLoadingProductList } = useQuery({
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

  const getProductById = async (id: number) => {
    const { data } = await api.get<IGetProductByIdResponse>(`/products/${id}`);
    return data;
  };

  return {
    getProductById,
    productList,
    isLoadingProductList,
    name,
    setName,
  };
};
