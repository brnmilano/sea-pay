"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import styles from "./create-account-form.module.scss";
import {
  CreateAccountValidationSchema,
  CreateUserSchemaProps,
} from "../../../schemas/create-account-validation";
import type { CreateAccountFormProps } from "../../../types/create-account.types";
import {
  ButtonSizes,
  ButtonVariants,
} from "@/components/ui/Button/button.type";
import { Checkbox } from "@/components/ui/Checkbox";

export function CreateAccountForm({
  onSubmit,
  isLoading,
}: CreateAccountFormProps) {
  const [isBusinessAccount, setIsBusinessAccount] = useState<boolean>(false);

  console.log({ isBusinessAccount });

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<CreateUserSchemaProps>({
    resolver: zodResolver(CreateAccountValidationSchema),
    shouldFocusError: false,
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      cpf: "",
      businessName: "",
      cnpj: "",
    },
  });

  useEffect(() => {
    if (isBusinessAccount) {
      resetField("fullName");
      resetField("businessName");
      resetField("cpf");
      resetField("cnpj");
    }
  }, [isBusinessAccount]);

  return (
    <main>
      <h2 className={styles.title}>
        Abra sua conta no <span className={styles.brand}>seaPay</span>
      </h2>

      <p className={styles.subtitle}>
        Complete os campos abaixo para abrir sua conta seaPay:
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          label="E-mail*"
          type="email"
          placeholder="exemplo@email.com"
          errors={errors}
          {...register("email")}
        />

        <Input
          label="Senha*"
          type="password"
          placeholder="••••••••"
          errors={errors}
          {...register("password")}
        />

        <Input
          label="Confirme sua senha*"
          type="password"
          placeholder="••••••••"
          errors={errors}
          {...register("confirmPassword")}
        />

        <div className={styles.checkboxContainer}>
          <Checkbox
            label="Conta para lojista"
            checked={isBusinessAccount}
            onChange={() => setIsBusinessAccount((prev) => !prev)}
            errors={errors}
          />
        </div>

        <p className={styles.checkboxNote}>
          *Contas para lojistas não são aptas a realizar transferências, apenas
          receber.
        </p>

        {/* <Input
          label="Nome Completo*"
          type="text"
          placeholder="João da Silva"
          errors={errors}
          {...register("fullName")}
        /> */}

        {!isBusinessAccount ? (
          <Input
            label="Nome Completo*"
            type="text"
            placeholder="João da Silva"
            errors={errors}
            {...register("fullName")}
          />
        ) : (
          <Input
            label="Razão social*"
            type="text"
            placeholder="Razão social da empresa"
            errors={errors}
            {...register("businessName")}
          />
        )}

        {/* <Input
          label="CPF*"
          type="text"
          placeholder="000.000.000-00"
          errors={errors}
          {...register("cpf")}
        /> */}

        {!isBusinessAccount ? (
          <Input
            label="CPF*"
            type="text"
            placeholder="000.000.000-00"
            errors={errors}
            {...register("cpf")}
          />
        ) : (
          <Input
            label="CNPJ*"
            type="text"
            placeholder="00.000.000/0000-00"
            errors={errors}
            {...register("cnpj")}
          />
        )}

        <div className={styles.actions}>
          <Button
            text={isLoading ? "Enviando..." : "Enviar"}
            ariaLabel="Criar Conta"
            size={ButtonSizes.MEDIUM}
            buttonVariant={ButtonVariants.PRIMARY}
            type="submit"
            disabled={isLoading}
          />
        </div>
      </form>
    </main>
  );
}
