"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LoginSchemaProps,
  LoginValidationSchema,
} from "../schemas/loginValidationSchema";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  ButtonSizes,
  ButtonVariants,
} from "@/components/ui/Button/Button.type";
import styles from "./login.module.scss";
import Logo from "../../../../../../public/logo-seapay.svg";
import BackgroundImage from "../../../../../../public/background-image.png";

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginSchemaProps>({
    resolver: zodResolver(LoginValidationSchema),
    shouldFocusError: false,
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const loginValue = watch("login");
  const passwordValue = watch("password");

  console.log("Login Value:", loginValue);
  console.log("Password Value:", passwordValue);

  const onSubmit = (data: LoginSchemaProps) => {
    if (data.login === "teste" && data.password === "teste") {
      alert("Login realizado com sucesso!");
    } else {
      alert("Login ou senha inválidos.");
    }

    console.log(data);
  };

  return (
    <main className={styles.containerLogin}>
      <section className={styles.loginSection}>
        <h1>Acesse sua conta</h1>

        <Image
          src={Logo}
          alt="Logo seaPay"
          width={114}
          height={42}
          quality={70}
          priority={true}
          loading="eager"
        />

        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputContainer}>
            <Input
              label="Login"
              placeholder="Digite seu CPF ou CNPJ cadastrado"
              errors={errors}
              {...register("login")}
            />

            <Input
              label="Senha"
              placeholder="Digite sua senha"
              type="password"
              errors={errors}
              {...register("password")}
            />
          </div>

          <Button
            text="Entrar"
            ariaLabel="Entrar"
            size={ButtonSizes.LARGE}
            buttonVariant={ButtonVariants.PRIMARY}
          />
        </form>
      </section>

      <aside className={styles.loginImage}>
        <Image
          src={BackgroundImage}
          alt="Pessoa sorrindo com celular"
          priority={true}
          style={{
            objectFit: "cover",
            aspectRatio: "9/16",
          }}
          fill
        />
      </aside>
    </main>
  );
}
