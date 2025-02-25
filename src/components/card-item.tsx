import { useCart } from "@/hooks/useCart";
import { IProduct } from "@/interfaces/IProduct";
import { formatCurrency } from "@/utils/format-currency";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./card-item.module.css";

export function CardItem({ product }: { product: IProduct }) {
  const router = useRouter();
  const { cart } = useCart();

  const goToProduct = (id: number) => {
    router.push(`/${id}`);
  };

  return (
    <li
      key={product.id}
      onClick={() => goToProduct(product.id)}
      className={styles["product-item"]}
    >
      <Image
        src={product.image}
        width={100}
        height={100}
        alt={`Imagem do produto ${product.title}`}
        loading="eager"
        className={styles.image}
      />
      <div className={styles["container-info-product"]}>
        <h2 className={styles["title-product"]}>{product.title}</h2>
        <span className={styles["price-product"]}>
          Preço: {formatCurrency(product.price)}
        </span>
        <p className={styles["description-product"]}>
          {product.description.length > 200
            ? product.description.substring(0, 200) + "..."
            : product.description}
        </p>

        {cart.some((item) => item.product.id === product.id) && (
          <span className={styles["product-added"]}>
            Adicionado ao carrinho
          </span>
        )}
      </div>
    </li>
  );
}
