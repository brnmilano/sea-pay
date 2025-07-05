import type { InputHTMLAttributes, ReactNode } from "react";

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
