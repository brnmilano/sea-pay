import { Metadata } from "next";
import Dashboard from "./src/components/dashboard";

export const metadata: Metadata = {
  title: "seaPay - Dashboard",
  description:
    "Bem-vindo ao painel de controle do seaPay, onde você pode gerenciar suas transações e configurações.",
};

export default function DashboardPage() {
  return <Dashboard />;
}
