import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "./login";

// Mock do react-hot-toast
jest.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock do next navigation
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      pathname: "/",
      query: {},
      asPath: "/",
    };
  },
  usePathname() {
    return "/";
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

describe("Login Component", () => {
  test("should match snapshot.", () => {
    const { container } = render(<Login />);

    expect(container).toMatchSnapshot();
  });

  test("should render the title 'Access your account'.", () => {
    render(<Login />);

    const title = screen.getByText("Acesse sua conta");

    expect(title).toBeInTheDocument();
  });

  test("should render the login form.", () => {
    render(<Login />);

    const loginInput = screen.getByPlaceholderText(
      "Digite seu CPF ou CNPJ cadastrado",
    );
    const passwordInput = screen.getByPlaceholderText("Digite sua senha");
    const submitButton = screen.getByRole("button", { name: /entrar/i });

    expect(loginInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("should render the SeaPay logo.", () => {
    render(<Login />);

    const logo = screen.getByAltText("Logo seaPay");

    expect(logo).toBeInTheDocument();
  });

  test("should render the registration link.", () => {
    render(<Login />);

    const signupText = screen.getByText(/Ainda não é membro\?/i);
    const signupLink = screen.getByText("Abra sua conta!");

    expect(signupText).toBeInTheDocument();
    expect(signupLink).toBeInTheDocument();
    expect(signupLink).toHaveAttribute("href", "/signup");
  });

  test("should render the background image.", () => {
    render(<Login />);

    const backgroundImage = screen.getByAltText("Pessoa sorrindo com celular");

    expect(backgroundImage).toBeInTheDocument();
  });

  test("should render the open account link.", () => {
    render(<Login />);

    const openAccountLink = screen.getByText("Abra sua conta!");
    expect(openAccountLink).toBeInTheDocument();
    expect(openAccountLink).toHaveAttribute("href", "/signup");
  });

  test("should send the user to the dashboard on successful login.", () => {
    const { useRouter } = require("next/navigation");
    const router = useRouter();

    render(<Login />);

    const loginInput = screen.getByPlaceholderText(
      "Digite seu CPF ou CNPJ cadastrado",
    );
    const passwordInput = screen.getByPlaceholderText("Digite sua senha");
    const submitButton = screen.getByRole("button", { name: /entrar/i });

    fireEvent.change(loginInput, { target: { value: "12345678900" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(submitButton);

    waitFor(() => {
      expect(router.push).toHaveBeenCalledWith("/dashboard");
    });
  });

  test("should show error message on failed login.", async () => {
    const toast = require("react-hot-toast").default;

    render(<Login />);

    const loginInput = screen.getByPlaceholderText(
      "Digite seu CPF ou CNPJ cadastrado",
    );

    const passwordInput = screen.getByPlaceholderText("Digite sua senha");
    const submitButton = screen.getByRole("button", { name: /entrar/i });

    fireEvent.change(loginInput, { target: { value: "wronguser" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Login ou senha inválidos");
    });
  });
});
