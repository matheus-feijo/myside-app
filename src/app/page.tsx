"use client";
import { useProduct } from "@/hooks/useProduct";
import { useRouter } from "next/navigation";

export default function Page() {
  const { products } = useProduct();
  const router = useRouter();

  const goToProduct = (id: number) => {
    router.push(`/${id}`);
  };

  return (
    <div>
      <main>
        <ol>
          {products?.products.map((product) => (
            <li key={product.id} onClick={() => goToProduct(product.id)}>
              {product.title}
            </li>
          ))}
        </ol>
      </main>
    </div>
  );
}
