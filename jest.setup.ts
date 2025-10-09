/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Configuração inicial do ambiente de testes
 *
 * @description
 * Este arquivo é executado uma vez antes de todos os testes.
 * Configura matchers customizados, mocks globais e supressão de warnings.
 */

/**
 * Importa matchers customizados do Testing Library
 * Adiciona assertions como: toBeInTheDocument(), toHaveClass(), etc.
 * @see https://github.com/testing-library/jest-dom
 */
import "@testing-library/jest-dom";

/**
 * Mock do sistema de navegação do Next.js 13+ (App Router)
 *
 * @description
 * Mocka os hooks de navegação para evitar erros durante os testes.
 * Todos os componentes que usam useRouter, usePathname ou useSearchParams
 * funcionarão corretamente nos testes.
 *
 * @example
 * const router = useRouter();
 * router.push('/dashboard'); // Não fará nada, mas não causará erro
 */
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      pathname: "/",
      query: {},
      asPath: "/",
    };
  },
  usePathname() {
    return "/";
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

/**
 * Mock do componente next/image
 *
 * @description
 * Substitui o componente <Image /> do Next por uma tag <img> simples, evitando warnings ao rodar os testes.
 * Remove props específicas do Next.js que não existem em <img> nativa.
 * Isso evita warnings relacionados à otimização de imagens durante os testes.
 *
 * @example
 * <Image src="/logo.png" alt="Logo" priority fill /> - é renderizado como <img src="/logo.png" alt="Logo" />
 */
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    const { createElement } = require("react");

    // Remove as props específicas do componente <Image /> do next que não existem em uma tag <img>
    const {
      priority,
      loading,
      quality,
      fill,
      sizes,
      unoptimized,
      onLoadingComplete,
      layout,
      objectFit,
      objectPosition,
      lazyBoundary,
      lazyRoot,
      ...imgProps
    } = props;

    // Retorna uma tag <img> simples com as props validas
    return createElement("img", imgProps);
  },
}));

/**
 * Supressão de warnings conhecidos e inofensivos no console
 *
 * @description
 * Durante os testes, alguns warnings do React/jsdom podem poluir o output.
 * Esta configuração filtra warnings conhecidos que não afetam os testes.
 */
const originalError = console.error;

beforeAll(() => {
  console.error = (...args: any[]) => {
    // Lista de warnings que devem ser suprimidos
    const warningsToSuppress = [
      "Warning: ReactDOM.render",
      "Warning: useLayoutEffect",
      "Not implemented: HTMLFormElement.prototype.submit",
      "Received `true` for a non-boolean attribute",
      "for a non-boolean attribute",
    ];

    // Verifica se a mensagem de erro contém algum warning conhecido
    if (typeof args[0] === "string") {
      const shouldSuppress = warningsToSuppress.some((warning) =>
        args[0].includes(warning),
      );

      if (shouldSuppress) {
        return; // Não exibe o warning
      }
    }

    // Exibe outros erros normalmente
    originalError.call(console, ...args);
  };
});

/**
 * Restaura o console.error original após todos os testes
 */
afterAll(() => {
  console.error = originalError;
});
