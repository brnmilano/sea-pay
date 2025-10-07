import * as zod from "zod";
import { requiredField } from "@/utils/messages";
import { cpfCnpjRegex } from "@/utils/utils";

// Text
export const textSchema = zod
  .string({
    message: requiredField,
  })
  .min(1, requiredField);

// Optional input
export const optionalTextSchema = zod.any().optional();

export const loginSchema = zod
  .string({ message: requiredField })
  .regex(cpfCnpjRegex, "Informe um CPF ou CNPJ válido (apenas números).");
