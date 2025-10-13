import * as zod from "zod";
import { cpfOrCnpjSchema, emailSchema, textSchema } from "@/schemas/schemas";

// Schema de validação para o formulário de criação de usuário
export const CreateUserValidationSchema = zod.object({
  email: emailSchema,
  password: textSchema,
  name: textSchema,
  cpfOrCnpj: cpfOrCnpjSchema,
});

export type CreateUserSchemaProps = zod.infer<
  typeof CreateUserValidationSchema
>;

export type fieldsTypes = "email" | "password" | "cpfOrCnpj" | "name";
