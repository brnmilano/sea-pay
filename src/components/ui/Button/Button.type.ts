import type { ButtonHTMLAttributes } from "react";

/**
 * Variantes visuais disponíveis para o componente Button
 * Define os estilos primário, secundário e de texto
 */
export enum ButtonVariants {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  TEXT = "text",
}

/**
 * Tamanhos disponíveis para o componente Button
 * Define os tamanhos pequenos, médios e grandes
 */
export enum ButtonSizes {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

/**
 * Props para o componente Button
 * Extende as propriedades nativas do elemento button HTML
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Texto a ser exibido no botão */
  text?: string;

  /** Variante visual do botão */
  buttonVariant?: ButtonVariants;

  /** Tamanho do botão */
  size?: ButtonSizes;

  /** Label para acessibilidade (aria-label) */
  ariaLabel?: string;

  /** Se o botão está desabilitado */
  disabled?: boolean;

  /** Referência para o elemento button */
  ref?: React.Ref<HTMLButtonElement>;
}
