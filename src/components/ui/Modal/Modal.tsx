"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import type { ModalProps } from "./Modal.type";
import styles from "./modal.module.scss";
import Image from "next/image";
import Logo from "../../../../public/logo-seapay.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateUserSchemaProps,
  CreateUserValidationSchema,
} from "@/app/(public)/login/src/schemas/create-user";
import { Input } from "../Input";

/**
 * @description Componente de Modal reutilizável com overlay e opção de fechar
 *
 * @param isOpen - Estado que controla se o modal está aberto ou fechado
 * @param onClose - Função chamada ao fechar o modal
 * @param is_shopkeeper - Flag para identificar se é um usuário lojista
 * @param children - Conteúdo a ser renderizado dentro do modal
 */
export default function Modal({ isOpen, onClose, is_shopkeeper }: ModalProps) {
  // Previne scroll do body quando o modal está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Fecha o modal ao pressionar ESC
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Fecha o modal ao clicar no overlay
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserSchemaProps>({
    resolver: zodResolver(CreateUserValidationSchema),
    shouldFocusError: false,
    defaultValues: {
      email: "",
      password: "",
      name: "",
      cpfOrCnpj: "",
    },
  });

  return (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={styles.modal} data-shopkeeper={is_shopkeeper}>
        <div className={styles.header}>
          <div className={styles.titleAndLogo}>
            <h1>Abra sua conta no</h1>

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
          </div>

          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Fechar modal"
            type="button"
          >
            <X size={24} />
          </button>
        </div>

        <p className={styles.subtitle}>
          Complete os campos abaixo para abrir sua conta seaPay:
        </p>

        <form action="">
          <Input
            label="Email"
            placeholder="Digite seu email"
            aria-description="Digite seu email"
            errors={errors}
            {...register("email")}
          />

          <Input
            label="Senha"
            placeholder="Digite sua senha"
            aria-description="Digite sua senha"
            errors={errors}
            {...register("password")}
          />

          <Input
            label="Nome completo"
            placeholder="Digite seu nome completo"
            aria-description="Digite seu nome completo"
            errors={errors}
            {...register("name")}
          />

          <Input
            label="CPF ou CNPJ"
            placeholder="Digite seu CPF ou CNPJ cadastrado"
            errors={errors}
            {...register("cpfOrCnpj")}
          />
          <button type="submit">Criar conta</button>
        </form>
      </div>
    </div>
  );
}
