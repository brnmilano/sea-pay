"use server";

import { User } from "@/types/user";
import { cookies } from "next/headers";

export async function setAuthCookie(user: User) {
  const cookieStore = await cookies();

  // Salvar o token de autenticação
  const token = Buffer.from(`${user.id}:${Date.now()}`).toString("base64");

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  });

  // Salvar os dados do usuário (acessível no client)
  cookieStore.set("user", JSON.stringify(user), {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  });
}

export async function removeAuthCookie() {
  const cookieStore = await cookies();

  cookieStore.delete("token");
  cookieStore.delete("user");
}
