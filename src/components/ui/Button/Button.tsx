import { ButtonSizes, ButtonVariants, type ButtonProps } from "./Button.type";
import styles from "./button.module.scss";

export function Button(props: ButtonProps) {
  const {
    text,
    buttonVariant = ButtonVariants.PRIMARY,
    size = ButtonSizes.SMALL,
    disabled = false,
    ariaLabel,
    ...rest
  } = props;

  return (
    <button
      className={`${styles.button} ${styles[buttonVariant]} ${
        styles[`size-${size}`]
      }`}
      aria-label={ariaLabel}
      data-variant={buttonVariant}
      data-size={size}
      disabled={disabled}
      {...rest}
    >
      {text}
    </button>
  );
}
