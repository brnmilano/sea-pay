import * as zod from "zod";
import { requiredField } from "@/utils/messages";
import { cpfCnpjRegex } from "@/utils/utils";

// Schema que aceita qualquer valor ou nenhum valor
export const optionalTextSchema = zod.any().optional();

// Texto
export const textSchema = zod
  .string({
    message: requiredField,
  })
  .min(1, requiredField);

// CPF ou CNPJ
export const cpfOrCnpjSchema = zod
  .string({ message: requiredField })
  .regex(cpfCnpjRegex, "Informe um CPF ou CNPJ válido (apenas números).");

// Email
export const emailSchema = zod
  .string({ message: requiredField })
  .email("Informe um e-mail válido.")
  .min(1, requiredField);
