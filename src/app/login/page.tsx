"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button/Button";
import { useState } from "react";
import { Input } from "@/components/ui/Input/Input";
import {
  ButtonSizes,
  ButtonVariants,
} from "@/components/ui/Button/Button.type";

export default function LoginPage() {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Acesse sua conta</h1>

      <Image
        src="/logo-seapay.svg"
        alt="Logo seaPay"
        width={114}
        height={42}
        quality={70}
        priority={true}
        loading="eager"
      />

      <Button
        text="Entrar"
        ariaLabel="Entrar"
        size={ButtonSizes.LARGE}
        buttonVariant={ButtonVariants.PRIMARY}
      />

      <Input
        placeholder="Digite seu CPF ou CNPJ cadastrado"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />

      <Input
        placeholder="Digite sua senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </main>
  );
}
