import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "seaPay - Página não encontrada",
  description: "A página que você está procurando não foi encontrada.",
};

export default function NotFoundPage() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        padding: "0 20px",
      }}
    >
      <h1
        style={{ fontSize: "3rem", marginBottom: "1rem", fontWeight: "bold" }}
      >
        404
      </h1>

      <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        Página não encontrada
      </h2>

      <p style={{ fontSize: "1.2rem", color: "#666", marginBottom: "2rem" }}>
        A página que você está procurando não existe ou foi movida.
      </p>

      <Link
        href="/login"
        style={{
          padding: "12px 24px",
          backgroundColor: "#0070f3",
          color: "white",
          borderRadius: "8px",
          textDecoration: "none",
          fontSize: "1rem",
          fontWeight: "500",
          transition: "background-color 0.2s",
        }}
      >
        Voltar para o Login
      </Link>
    </main>
  );
}
