// Regex para CPF (11 dígitos) ou CNPJ (14 dígitos)
export const cpfCnpjRegex = /^(?:\d{11}|\d{14})$/;

// Máscara para CPF/CNPJ
export function maskCpfCnpj(value: string): string {
  const numbers = value.replace(/\D/g, "");
  if (numbers.length <= 11) {
    // CPF: 000.000.000-00
    return numbers
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
  } else {
    // CNPJ: 00.000.000/0000-00
    return numbers
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4")
      .replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, "$1.$2.$3/$4-$5");
  }
}
