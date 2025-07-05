import type { KeyboardEvent } from "react";
import type { InputProps } from "./Input.types";
import { useState, useCallback, useMemo, useId } from "react";
import { Lock, LockKeyhole } from "lucide-react";
import styles from "./input.module.scss";

/**
 * @description Componente de Input. Possui visibilidade de senha, acessibilidade,
 * estilos personalizáveis e utiliza os hooks useState, useCallback e useMemo.
 * - Utiliza o useCallback para evitar recriações desnecessárias de funções.
 * - Utiliza o useMemo para evitar recriações desnecessárias.
 * - Utiliza o useId para gerar IDs únicos para acessibilidade.
 *
 * @param param0 [InputProps]
 * @param param0.icon Ícone a ser exibido no input
 * @param param0.iconPosition Posição do ícone no input
 * @param param0.containerClassName Classes CSS personalizadas para o wrapper externo do input
 * @param param0.className Classes CSS adicionais para o input
 * @param param0.type Tipo do input sendo text ou password (o padrão é "text")
 * @param rest Todas as outras propriedades do input HTML (placeholder, disabled, onChange, etc.)
 * @returns
 */
export function Input({
  icon,
  iconPosition = "right",
  containerClassName,
  className,
  type = "text",
  ...rest
}: InputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const isPasswordType = type === "password";
  const inputId = useId();

  const inputType = isPasswordType
    ? showPassword
      ? "text"
      : "password"
    : type;

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLSpanElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        togglePasswordVisibility();
      }
    },
    [togglePasswordVisibility],
  );

  const containerClasses = useMemo(
    () => `${styles.container} ${containerClassName}`.trim(),
    [containerClassName],
  );

  const inputClasses = useMemo(
    () => `${styles.input} ${className}`.trim(),
    [className],
  );

  const iconClasses = useMemo(() => `${styles.icon} ${styles.clickable}`, []);

  const PadlockIcon = useMemo(
    () => (showPassword ? <LockKeyhole size={20} /> : <Lock size={20} />),
    [showPassword],
  );

  const accessibilityProps = useMemo(
    () => ({
      "aria-label": showPassword ? "Ocultar senha" : "Mostrar senha",
      "aria-pressed": showPassword,
      "aria-controls": inputId,
      title: showPassword ? "Ocultar senha" : "Mostrar senha",
    }),
    [showPassword, inputId],
  );

  return (
    <div className={containerClasses}>
      <div className={styles.content}>
        <input
          id={inputId}
          className={inputClasses}
          type={inputType}
          {...rest}
        />

        {isPasswordType && (
          <span
            className={iconClasses}
            onClick={togglePasswordVisibility}
            role="button"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            {...accessibilityProps}
          >
            {PadlockIcon}
          </span>
        )}

        {icon && iconPosition === "right" && !isPasswordType && (
          <span className={styles.icon}>{icon}</span>
        )}
      </div>
    </div>
  );
}
