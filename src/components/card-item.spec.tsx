import { IProduct } from "@/interfaces/IProduct";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { CardItem } from "./card-item";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("CardItem", () => {
  const product: IProduct = {
    id: 1,
    title: "Product 1",
    image: "https://via.placeholder.com/150",
    price: 100,
    description: "Description 1",
    brand: "Brand 1",
    model: "Model 1",
    color: "Color 1",
    category: "Category 1",
    discount: 10,
  };

  test("Deve ser possivel renderizar um produto", () => {
    render(<CardItem product={product} />);
    expect(screen.getByRole("listitem")).toBeInTheDocument();
  });

  test("Deve ser possivel clicar em um produto e redirecionar para tela de detalhes", () => {
    const mockPush = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    render(<CardItem product={product} />);

    fireEvent.click(screen.getByText(product.title));

    expect(mockPush).toHaveBeenCalledWith(`/${product.id}`);
  });

  test("Deve ser possivel visualizar o valor do item formatado", () => {
    render(<CardItem product={product} />);

    const formattedPrice = `Preço: R$ 100,00`;
    const priceElement = screen.getByText(formattedPrice);

    expect(priceElement).toBeInTheDocument();
  });
});
