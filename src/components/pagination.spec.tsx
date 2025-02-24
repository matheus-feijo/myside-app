import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "./pagination";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("lucide-react", () => ({
  ChevronLeft: jest.fn(),
  ChevronRight: jest.fn(),
}));

describe("Pagination", () => {
  test("Deve ser possivel renderizar a paginacao", () => {
    const getParams = jest.fn();

    (useSearchParams as jest.Mock).mockReturnValue({
      get: getParams,
    });

    render(<Pagination />);

    expect(screen.getByText("Anterior")).toBeInTheDocument();
    expect(screen.getByText("Próximo")).toBeInTheDocument();
  });

  test("Deve ser possivel avançar de pagina", () => {
    const mockPush = jest.fn();
    window.scrollTo = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue("1"),
    });

    render(<Pagination />);
    const nextPageButton = screen.getByText("Próximo");

    fireEvent.click(nextPageButton);
    expect(mockPush).toHaveBeenCalledWith("/?page=2");
  });

  test("Deve ser possivel voltar de pagina", () => {
    const mockPush = jest.fn();
    window.scrollTo = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue("2"),
    });

    render(<Pagination />);
    const backPageButton = screen.getByText("Anterior");
    fireEvent.click(backPageButton);

    expect(mockPush).toHaveBeenCalledWith("/?page=1");
  });

  test("Não Deve ser possivel voltar pagina caso seja a primeira", () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue("1"),
    });

    render(<Pagination />);
    const backPageButton = screen.getByText("Anterior");
    fireEvent.click(backPageButton);
    expect(mockPush).not.toHaveBeenCalled();
  });
});
