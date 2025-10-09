"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {
  LoginSchemaProps,
  LoginValidationSchema,
} from "../schemas/login-validation-schema";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  ButtonSizes,
  ButtonVariants,
} from "@/components/ui/Button/Button.type";
import { FAKE_USERS } from "@/utils/fake-users";
import { setAuthCookie } from "@/services/auth/auth-cookies";
import Logo from "../../../../../../public/logo-seapay.svg";
import BackgroundImage from "../../../../../../public/background-image.png";
import styles from "./login.module.scss";

export default function Login() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaProps>({
    resolver: zodResolver(LoginValidationSchema),
    shouldFocusError: false,
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchemaProps) => {
    setIsLoading(true);

    try {
      // Simular delay de rede (300ms)
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Buscar usuário
      const user = FAKE_USERS.find(
        (user) => user.login === data.login && user.password === data.password,
      );

      if (!user) {
        toast.error("Login ou senha inválidos");

        setIsLoading(false);
        return;
      }

      // Salvar token e dados do usuário em cookies (Server Action)
      await setAuthCookie({
        id: user.id,
        login: user.login,
        name: user.name,
        email: user.email,
        type: user.type,
      });

      // Exibir mensagem de sucesso
      toast.success(`Bem-vindo(a), ${user.name}!`);

      // Redirecionar para o dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Erro ao fazer login:", { error });

      toast.error("Erro ao conectar com o servidor");
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.containerLogin}>
      <section className={styles.loginSection}>
        <div className={styles.loginContent}>
          <Image
            src={Logo}
            alt="Logo seaPay"
            width={114}
            height={42}
            quality={70}
            priority={true}
            loading="eager"
            className={styles.logo}
          />

          <h1 className={styles.title}>Acesse sua conta</h1>

          <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputContainer}>
              <Input
                label="Login"
                placeholder="Digite seu CPF ou CNPJ cadastrado"
                errors={errors}
                registerField="login"
                {...register("login")}
              />

              <Input
                label="Senha"
                placeholder="Digite sua senha"
                type="password"
                errors={errors}
                registerField="password"
                {...register("password")}
              />
            </div>

            <Button
              text={isLoading ? "Entrando..." : "Entrar"}
              ariaLabel="Entrar"
              size={ButtonSizes.LARGE}
              buttonVariant={ButtonVariants.PRIMARY}
              disabled={isLoading}
            />
          </form>

          <p className={styles.signupText}>
            Ainda não é membro?{" "}
            <a href="/signup" className={styles.signupLink}>
              Abra sua conta!
            </a>
          </p>
        </div>
      </section>

      <aside className={styles.loginImage}>
        <Image
          src={BackgroundImage}
          alt="Pessoa sorrindo com celular"
          priority={true}
          fill
          quality={90}
          sizes="50vw"
        />
      </aside>
    </main>
  );
}
