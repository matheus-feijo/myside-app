"use client";
import { useParams } from "next/navigation";

export default function ProdcutDetail() {
  const { id } = useParams();

  return (
    <div>
      <main>{id}</main>
    </div>
  );
}
