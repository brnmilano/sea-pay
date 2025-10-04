import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: "standalone",

  /**
   * @description É um recurso experimental do Next.js que permite reescrever
   * automaticamente suas importações para que você traga somente o que está
   * usando, ao invés de importar tudo da biblioteca. Ou seja, cada função é
   * importada separadamente, e o restante da biblioteca não entra no bundle.
   *
   * @remarks Benefícios:
   * - Bundle menor, pois importa apenas os componentes que são incluídos no bundle final.
   * - Tree-shaking automático, onde o Next.js remove o código não utilizado.
   * - Performance melhorada no Google Lighthouse, menos JavaScript é carregado no navegador.
   * - Imports automáticos, onde você não precisa mais se preocupar em importar
   * funções específicas de bibliotecas como lodash, date-fns, etc.
   * - Melhora a legibilidade do código, pois as importações ficam mais explícitas.
   *
   * @remarks lodash é o nome de exemplo da biblioteca que você quer modularizar.
   * @remarks transform é a função que define como a importação deve ser reescrita.
   * @remarks É um template onde {{member}} será substituído pelo nome da
   * função usada na importação
   *
   * @example
   * // ESSE EXEMPLO É O ERRADO:
   * import { debounce, throttle } from 'lodash';
   *
   * @example
   * // ESSE EXEMPLO É O CERTO:
   * import debounce from 'lodash/debounce';
   * import throttle from 'lodash/throttle';
   *
   * @type {import('next').NextConfig}
   * @see https://nextjs.org/docs/api-reference/next.config.js/introduction
   * @see https://medium.com/@under_the_hook/next-js-modularize-imports-687d7a2cddcf
   * @see https://github.com/vercel/next.js/issues/52307
   */
  modularizeImports: {
    "date-fns": {
      transform: "date-fns/{{member}}",
    },
  },

  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
