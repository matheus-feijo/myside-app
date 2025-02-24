import { IProduct } from "@/interfaces/IProduct";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { CardItem } from "./card-item";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn(),
    refresh: jest.fn(),
    pathname: "/mocked-path", // Defina um valor padrão para testes
  }),
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
});
