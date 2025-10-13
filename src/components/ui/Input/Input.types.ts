/* eslint-disable @typescript-eslint/no-explicit-any */
import type { InputHTMLAttributes, ReactNode } from "react";
import { FieldErrors, Path } from "react-hook-form";

/**
 * Posições possíveis para o ícone no input
 */
export type IconPosition = "right";

/**
 * Props para o componente Input
 * Extende as propriedades nativas do elemento input HTML
 */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Ícone a ser exibido no input */
  icon?: ReactNode;

  /** Posição do ícone no input */
  iconPosition?: IconPosition;

  /** Classes CSS adicionais para o container */
  containerClassName?: string;

  /** Label do input */
  label?: string;

  /**
   * Matriz de erros gerada pela biblioteca React Hook Form. É usado para renderizar o erro de entrada, se houver algum.
   */
  errors: FieldErrors<any>;
  /**
   * Propriedade utilizada para identificar a entrada do valor do input, também é utilizada no atributo "nome".
   * Se não fornecido, será usado o valor da prop 'name' do input.
   */
  registerField?: Path<any>;

  /** Referência para o elemento input */
  ref?: React.Ref<HTMLInputElement>;
}

/**
 * Props para acessibilidade do botão de toggle de senha
 */
export interface PasswordToggleAccessibilityProps {
  "aria-label": string;
  "aria-pressed": boolean;
  "aria-controls": string;
  title: string;
}
