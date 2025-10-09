/**
 * Mock para arquivos CSS/SCSS não-modulares
 *
 * @description
 * Este mock é usado quando o Jest encontra imports de arquivos CSS/SCSS
 * que não são CSS Modules (arquivos sem .module no nome).
 *
 * Retorna um objeto vazio para evitar erros de parsing durante os testes,
 * já que o Jest não consegue processar CSS nativamente.
 *
 * @example
 * import './styles.scss'; // → {}
 * import './global.css';  // → {}
 */
module.exports = {};
