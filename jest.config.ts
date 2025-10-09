/**
 * Configuração do Jest para testes unitários
 *
 * @description
 * Este arquivo configura o Jest para trabalhar com Next.js, TypeScript,
 * React Testing Library e módulos CSS/SCSS.
 *
 * @see https://jestjs.io/docs/getting-started
 * @see https://jestjs.io/docs/configuration
 * @see https://nextjs.org/docs/app/guides/testing/jest
 */

import type { Config } from "jest";
import nextJest from "next/jest";

/**
 * Cria a configuração base do Jest para Next.js
 * Isso garante que o Jest possa carregar next.config.js e variáveis de ambiente
 */
const createJestConfig = nextJest({
  dir: "./",
});

/**
 * Configurações customizadas do Jest
 */
const config: Partial<Config> = {
  /**
   * Limpa automaticamente os mocks antes de cada teste
   * Isso evita que mocks de um teste afetem outros testes
   */
  clearMocks: true,

  /**
   * Define se a cobertura de código será coletada durante a execução dos testes
   * false: Testes executam mais rápido (use 'npm test')
   * true: Gera relatório de cobertura (use 'npm run test:coverage')
   */
  collectCoverage: false,

  /**
   * Padrões de arquivos para coletar cobertura de código
   * Inclui: Todos os arquivos .js, .jsx, .ts, .tsx em src/
   * Exclui: Arquivos de tipos, stories, testes, pages, layouts e middleware
   */
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.stories.{js,jsx,ts,tsx}",
    "!src/**/*.test.{js,jsx,ts,tsx}",
    "!src/**/*.spec.{js,jsx,ts,tsx}",
    "!src/app/**/page.tsx",
    "!src/app/**/layout.tsx",
    "!src/middleware.ts",
  ],

  /**
   * Diretório onde os relatórios de cobertura serão salvos
   */
  coverageDirectory: "coverage",

  /**
   * Motor usado para instrumentar o código e calcular a cobertura
   * v8: Mais rápido e preciso (nativo do Node.js)
   */
  coverageProvider: "v8",

  /**
   * Formatos de relatório de cobertura a serem gerados
   * - json: Dados brutos em JSON
   * - text: Tabela no terminal
   * - lcov: Para ferramentas como SonarQube e Codecov
   * - clover: Formato XML
   * - html: Relatório visual navegável (coverage/index.html)
   */
  coverageReporters: ["json", "text", "lcov", "clover", "html"],

  /**
   * Ambiente de teste a ser usado
   * jsdom: Simula um navegador (necessário para testes de componentes React)
   */
  testEnvironment: "jsdom",

  /**
   * Arquivo de configuração executado após o ambiente de teste ser configurado
   * Configura React Testing Library, mocks do Next.js e supressão de warnings
   */
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  /**
   * Mapeamento de módulos para resolver imports e mockar assets
   */
  moduleNameMapper: {
    /**
     * Resolve o alias @/ para a pasta src/
     * Exemplo: import { Button } from '@/components/Button'
     */
    "^@/(.*)$": "<rootDir>/src/$1",

    /**
     * Mocka CSS Modules (arquivos .module.css, .module.scss)
     * Retorna um objeto com as classes CSS como propriedades
     * Exemplo: styles.button → { button: 'button' }
     */
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",

    /**
     * Mocka arquivos CSS/SCSS não-modulares
     * Retorna um objeto vazio para evitar erros de parsing
     */
    "^.+\\.(css|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",

    /**
     * Mocka importações de imagens
     * Retorna uma string simples ao invés do arquivo real
     */
    "^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i":
      "<rootDir>/__mocks__/fileMock.js",
  },

  /**
   * Padrões de arquivos que serão identificados como testes
   * - Arquivos dentro de pastas __tests__/
   * - Arquivos com sufixo .test ou .spec
   */
  testMatch: [
    "**/__tests__/**/*.?([mc])[jt]s?(x)",
    "**/?(*.)+(spec|test).?([mc])[jt]s?(x)",
  ],

  /**
   * Padrões de arquivos que NÃO devem ser transformados pelo Jest
   * - node_modules: Bibliotecas externas já estão compiladas
   * - CSS Modules: São tratados pelo moduleNameMapper
   */
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],

  /**
   * Extensões de arquivo que o Jest deve processar
   */
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  /**
   * Diretórios que devem ser ignorados ao procurar por testes
   */
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],

  /**
   * Usa o Watchman para detecção de mudanças em arquivos (mais rápido)
   */
  watchman: true,
};

/**
 * Exporta a configuração processada pelo Next.js
 * O createJestConfig é assíncrono e adiciona configurações adicionais do Next.js
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default createJestConfig(config as any);
