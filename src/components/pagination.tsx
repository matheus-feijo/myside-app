import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./button";
import styles from "./pagination.module.css";

export function Pagination() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePreviousPage = () => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
    const currentPage = parseInt(searchParams.get("page") || "1");
    const previousPage = currentPage - 1;
    router.push(`/?page=${previousPage}`);
  };

  const handleNextPage = () => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
    const currentPage = parseInt(searchParams.get("page") || "1");
    const nextPage = currentPage + 1;
    router.push(`/?page=${nextPage}`);
  };

  return (
    <>
      <div className={styles.pagination}>
        <Button
          className={styles["page-button"]}
          onClick={handlePreviousPage}
          disabled={
            !searchParams.get("page") || searchParams.get("page") === "1"
          }
          variant="default"
        >
          <ChevronLeft width={16} /> Anterior
        </Button>

        {/* Como o endpoint nao informa o total de paginas, assumi que o maximo de itens é 150, de acordo
  com oque estava na documentação.
*/}
        <Button
          variant="primary"
          className={styles["page-button"]}
          onClick={handleNextPage}
          disabled={
            parseInt(searchParams.get("page") || "1") >= Math.ceil(150 / 10)
          }
        >
          Próximo <ChevronRight width={16} />
        </Button>
      </div>
    </>
  );
}
