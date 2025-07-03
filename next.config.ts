import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: "standalone",

  /**
   * @type {import('next').NextConfig}
   * @see https://nextjs.org/docs/api-reference/next.config.js/introduction
   * @see https://medium.com/@under_the_hook/next-js-modularize-imports-687d7a2cddcf
   *
   * @description É um recurso experimental do Next.js que permite reescrever
   * automaticamente suas importações para que você traga somente o que está
   * usando, ao invés de importar tudo da biblioteca. Ou seja, cada função é
   * importada separadamente, e o restante da biblioteca não entra no bundle.
   *
   * @description lodash é o nome de exemplo da biblioteca que você quer modularizar.
   * @description transform é a função que define como a importação deve ser reescrita.
   * @description É um template onde {{member}} será substituído pelo nome da
   * função usada na importação
   *
   * @example import { debounce, throttle } from 'lodash'; // ESSE EXEMPLO É O ERRADO.
   *
   * @example import debounce from 'lodash/debounce'; // ESSE EXEMPLO É O CERTO.
   * @example import throttle from 'lodash/throttle'; // ESSE EXEMPLO É O CERTO.
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
