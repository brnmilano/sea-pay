/**
 * Mock para arquivos estáticos (imagens, fontes, etc.)
 *
 * @description
 * Este mock é usado quando o Jest encontra imports de arquivos estáticos
 * como imagens (PNG, JPG, SVG, etc.) ou outros assets binários.
 *
 * Retorna uma string simples ao invés do arquivo real, já que durante
 * os testes não precisamos carregar os arquivos reais.
 *
 * @example
 * import logo from './logo.png';     // → "test-file-stub"
 * import icon from './icon.svg';     // → "test-file-stub"
 * import bg from './background.jpg'; // → "test-file-stub"
 */
module.exports = "test-file-stub";
