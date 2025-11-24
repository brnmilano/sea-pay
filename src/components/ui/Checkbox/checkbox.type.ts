import { ChangeEvent, InputHTMLAttributes, Ref } from "react";
import { FieldErrors, Path } from "react-hook-form";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Label do checkbox */
  label?: string;
  /**
   * Função chamada quando o valor do checkbox muda
   * @param event - Evento de mudança do input
   * @returns void
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  /**
   * Matriz de erros gerada pela biblioteca React Hook Form. É usado para renderizar o erro de entrada, se houver algum.
   */
  errors: FieldErrors<any>;

  /**
   * Propriedade utilizada para identificar a entrada do valor do input, também é utilizada no atributo "nome".
   * Se não fornecido, será usado o valor da prop 'name' do input.
   */
  registerField?: Path<any>;
  /**
   * Referência para o elemento input
   */
  ref?: Ref<HTMLInputElement>;
}
