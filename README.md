# Boas-vindas ao seaPay, um site desktop de transferências de valores entre contas pessoais e lojistas.

![Minha imagem](https://github.com/user-attachments/assets/c56ff6fa-b334-452b-8697-e4310d4b399c)

## 🚀 Iniciando o projeto

### Pré-requisitos

Certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **pnpm** (gerenciador de pacotes)
- **Docker** e **Docker Compose** (opcional, para desenvolvimento em container)

### Instalação das dependências

```bash
# Instalar dependências
pnpm install
```

### Desenvolvimento local (sem Docker)

```bash
# Iniciar servidor de desenvolvimento
pnpm dev

# O aplicativo estará disponível em http://localhost:3000
```

### Desenvolvimento com Docker

```bash
# Iniciar container em modo desenvolvimento
docker-compose up

# Ou executar em segundo plano (background)
docker-compose up -d

# O aplicativo estará disponível em http://localhost:3000
```

## Scripts disponíveis

```bash
# Desenvolvimento
pnpm dev          # Inicia servidor de desenvolvimento (localhost:3000)
pnpm build        # Cria build de produção otimizado
pnpm start        # Inicia servidor de produção (requer o build antes)

# Qualidade de código
pnpm lint         # Executa ESLint para verificar problemas no código

# Testes
pnpm test              # Executa todos os testes (sem cobertura)
pnpm test:watch        # Executa testes em modo watch
pnpm test:coverage     # Executa testes com relatório de cobertura
```

## 🐳 Comandos úteis para desenvolvimento com Docker

### Gerenciamento básico de containers

```bash
# Iniciar serviços
docker-compose up

# Iniciar em background
docker-compose up -d

# Parar containers (preserva volumes)
docker-compose stop

# Parar e remover containers, networks e volumes
docker-compose down

# Parar e remover tudo, incluindo imagens
docker-compose down --rmi all --volumes
```

### 💡 Dicas Docker

- **Hot Reload:** As mudanças no código são refletidas automaticamente no container de desenvolvimento
- **Volumes:** O código fonte é montado como volume, então não precisa reconstruir a imagem a cada mudança
- **node_modules:** É criado um volume anônimo para node_modules, garantindo melhor performance
- **Porta 3000:** Por padrão, a aplicação roda na porta 3000 (dev) e 3001 (prod)

📖 **Documentação completa:** Veja [docker-commands.md](https://github.com/brnmilano/sea-pay/blob/main/docker/docker-commands.md)

## 🧪 Testes

Este projeto utiliza **Jest** e **React Testing Library** para testes unitários e de componentes.

### Executando os testes

```bash
# Executar todos os testes (sem relatório de cobertura)
pnpm test

# Executar testes em modo watch (observa mudanças)
pnpm test:watch

# Executar testes de um arquivo específico
pnpm test caminho/do/arquivo.test.tsx

# Executar arquivo específico em modo watch
pnpm test:watch caminho/do/arquivo.test.tsx

# Executar testes com relatório de cobertura
pnpm test:coverage
```

### Configuração

A configuração de testes unitários está distribuída nos seguintes arquivos:

#### 📄 `jest.config.ts`

Configuração principal do Jest com integração ao Next.js:

- Ambiente de teste: `jsdom` (simula navegador)
- Cobertura de código configurada
- Mapeamento de módulos CSS/SCSS e imagens
- Path aliases (@/)

#### 📄 `jest.setup.ts`

Configuração do ambiente de testes:

- Matchers customizados do Testing Library (`toBeInTheDocument`, etc.)
- Mocks do Next.js (useRouter, Image, etc.)
- Supressão de warnings conhecidos

#### 📁 `__mocks__`

Mocks de arquivos estáticos:

- `styleMock.js` - Mock para CSS/SCSS
- `fileMock.js` - Mock para imagens e assets

### Exemplo de teste

```typescript
import { render, screen } from "@testing-library/react";
import Login from "./login";

describe("Login Component", () => {
  it("deve renderizar o título 'Acesse sua conta'", () => {
    render(<Login />);

    const title = screen.getByText("Acesse sua conta");

    expect(title).toBeInTheDocument();
  });
});
```

### Relatório de cobertura

Após executar `npm run test:coverage`, você pode visualizar o relatório detalhado em:

```
coverage/
└── index.html  👈 Abra no navegador
```

### Dependências de teste

- **Jest** `^30.0.0` - Framework de testes
- **@testing-library/react** `^16.3.0` - Utilitários para testar componentes React
- **@testing-library/jest-dom** `^10.4.1` - Matchers customizados
- **jest-environment-jsdom** - Ambiente de teste simulando navegador
- **identity-obj-proxy** - Mock para CSS Modules
- **ts-node** - Suporte para TypeScript no Jest

### � Snapshot Testing

Snapshot tests capturam a estrutura HTML dos componentes e alertam sobre mudanças inesperadas:

```typescript
test("should match snapshot", () => {
  const { container } = render(<Login />);
  expect(container).toMatchSnapshot();
});
```

**Quando atualizar snapshots:**

- Após mudanças intencionais no componente
- Use `pnpm test -u` para atualizar todos os snapshots

**Localização dos snapshots:**

```
src/
└── components/
    └── Login/
        ├── Login.tsx
        ├── Login.test.tsx
        └── __snapshots__/
            └── Login.test.tsx.snap  ✅
```

### �💡 Dicas úteis

```bash
# Ver todos os testes disponíveis sem executá-los
pnpm test --listTests

# Executar apenas testes que falharam na última execução
pnpm test --onlyFailures

# Atualizar snapshots (após mudanças intencionais no componente)
pnpm test -u

# Atualizar snapshots interativamente no modo watch
pnpm test:watch
# Pressione 'u' quando um snapshot falhar

# Executar testes com output detalhado
pnpm test --verbose

# Limpar cache do Jest (útil quando algo não funciona)
pnpm test --clearCache
```

**Atalhos no modo watch:**

- Pressione `a` para executar todos os testes
- Pressione `f` para executar apenas testes que falharam
- Pressione `p` para filtrar por nome do arquivo
- Pressione `t` para filtrar por nome do teste
- Pressione `u` para atualizar snapshots que falharam
- Pressione `i` para atualizar snapshots interativamente
- Pressione `q` para sair
