"use client";

import { useState } from "react";
import type { CreateAccountFormData } from "../types/create-account.types";

export function useCreateAccount() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: CreateAccountFormData) => {
    try {
      console.log("Dados do formulário:", data);
      setIsLoading(true);

      // Aqui você faria a chamada à API
      // await createAccountService(data);

      // Simular delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setShowSuccess(true);
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      // Tratar erro aqui
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  return {
    showSuccess,
    handleSubmit,
    isLoading,
    handleCloseSuccess,
  };
}
