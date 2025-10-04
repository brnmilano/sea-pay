import type { Metadata } from "next";
import Login from "./src/components/login";

export const metadata: Metadata = {
  title: "seaPay - Login",
  description:
    "Boas-vindas ao seaPay, um site de transferências de valores entre contas pessoais e lojistas.",
};

export default function LoginPage() {
  return <Login />;
}
