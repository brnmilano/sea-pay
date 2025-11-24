import { ChangeEvent, useCallback, useId } from "react";
import { CheckboxProps } from "./checkbox.type";
import styles from "./checkbox.module.scss";

export function Checkbox(props: CheckboxProps) {
  const { label, onChange, checked = false, ...rest } = props;

  const checkboxId = useId();

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
    },
    [onChange],
  );

  return (
    <main className={styles.checkboxContainer}>
      <label htmlFor={checkboxId} className={styles.label}>
        {label}
      </label>

      <input
        type="checkbox"
        id={checkboxId}
        checked={checked}
        onChange={handleChange}
        {...rest}
      />
    </main>
  );
}
