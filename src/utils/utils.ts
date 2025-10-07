export function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
}

// Regex para CPF (11 dígitos) ou CNPJ (14 dígitos)
// Aceita com ou sem formatação: 000.000.000-00/00000000000 e 00.000.000/0000-00 ou 00000000000000
export const cpfCnpjRegex =
  /^(?:\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11}|\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}|\d{14})$/;

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
