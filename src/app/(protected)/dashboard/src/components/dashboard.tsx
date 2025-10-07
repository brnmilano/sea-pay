"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { removeAuthCookie } from "@/services/auth/auth-cookies";
import { getCookie } from "@/utils/utils";
import { User } from "@/types/user";

export default function Dashboard() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Verificar se há usuário logado através do cookie
    const userCookie = getCookie("user");

    if (!userCookie) {
      console.log("❌ Usuário não autenticado, redirecionando para login...");
      router.push("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(decodeURIComponent(userCookie));
      console.log("✅ Usuário autenticado:", parsedUser);
      setUser(parsedUser);
    } catch (error) {
      console.error("❌ Erro ao carregar dados do usuário:", error);
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = async () => {
    console.log("🚪 Fazendo logout...");

    // Remover cookies através da Server Action
    await removeAuthCookie();

    router.push("/login");
  };

  if (isLoading) {
    return (
      <main style={{ padding: "2rem" }}>
        <div>Carregando...</div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
          Dashboard - SeaPay
        </h1>
        <p style={{ color: "#666" }}>Bem-vindo(a) ao painel de controle</p>
      </div>

      <div
        style={{
          background: "#f5f5f5",
          padding: "2rem",
          borderRadius: "8px",
          marginBottom: "2rem",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
          Informações do Usuário
        </h2>
        <div style={{ display: "grid", gap: "0.5rem" }}>
          <p>
            <strong>ID:</strong> {user.id}
          </p>
          <p>
            <strong>Nome:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Login:</strong> {user.login}
          </p>
          <p>
            <strong>Tipo:</strong>{" "}
            {user.type === "PF" ? "Pessoa Física" : "Pessoa Jurídica"}
          </p>
        </div>
      </div>

      <button
        onClick={handleLogout}
        style={{
          background: "#dc3545",
          color: "white",
          padding: "0.75rem 1.5rem",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "1rem",
          fontWeight: "500",
        }}
      >
        Sair
      </button>
    </main>
  );
}
