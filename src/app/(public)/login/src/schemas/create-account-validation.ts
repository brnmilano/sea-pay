import * as zod from "zod";
import {
  booleanSchema,
  cpfOrCnpjSchema,
  emailSchema,
  textSchema,
} from "@/schemas/schemas";

// Schema de validação para o formulário de criação de conta
export const CreateAccountValidationSchema = zod.object({
  email: emailSchema,
  password: textSchema,
  confirmPassword: textSchema,
  businessName: textSchema,
  fullName: textSchema,
  cpf: cpfOrCnpjSchema,
  cnpj: cpfOrCnpjSchema,
});

export type CreateUserSchemaProps = zod.infer<
  typeof CreateAccountValidationSchema
>;

export type fieldsTypes =
  | "email"
  | "password"
  | "confirmPassword"
  | "fullName"
  | "cpf"
  | "cnpj";
