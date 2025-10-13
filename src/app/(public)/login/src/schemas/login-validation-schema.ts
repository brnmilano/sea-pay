import * as zod from "zod";
import { cpfOrCnpjSchema, textSchema } from "@/schemas/schemas";

// Schema de validação para o formulário de login
export const LoginValidationSchema = zod.object({
  login: cpfOrCnpjSchema,
  password: textSchema,
});

export type LoginSchemaProps = zod.infer<typeof LoginValidationSchema>;

export type fieldsTypes = "login" | "password";
