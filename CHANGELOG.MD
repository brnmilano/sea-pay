# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [Releases]

## [0.1.0] - 16-06-2025

### Added

- Create folder structure and add necessary libraries

## [0.2.0] - 02-07-2025

### Added

- **Docker Infrastructure**: Implementação completa do ambiente Docker
  - Dockerfile configurado para criação de imagens personalizadas da aplicação Next.js
  - docker-compose.yml para orquestração de serviços em desenvolvimento
  - Pasta `docker/` estruturada com scripts de deployment para diferentes ambientes
- **Environment Scripts**: Scripts de deployment automatizado
  - `dev.sh`: Script para execução em ambiente de desenvolvimento
  - `hml.sh`: Script para execução em ambiente de homologação (vazio, não necessário)
  - `prod.sh`: Script para execução em ambiente de produção (vazio, não necessário)
- **Performance Optimization**: Configurações avançadas no next.config.ts para otimização de performance baseada nas métricas do Google Lighthouse
- **Dependencies**: Adição de novas bibliotecas essenciais para o desenvolvimento da aplicação
- **Layout Components**:
  - Implementação completa do componente Footer
  - Sistema de roteamento condicional para exibição do footer

### Changed

- **Global Styling**: Refatoração do sistema de estilos globais com implementação de variáveis CSS personalizadas e melhorias na responsividade do layout

## [0.3.0] - 03-07-2025

### Added

- **Dependencies**: Adição de novas bibliotecas essenciais para o desenvolvimento da aplicação
- **Layout Components**: Criação da tela de login

### Changed

- **Improved comments**: Melhoria e organização dos comentários feitos no arquivo next.config.ts

## [0.4.0] - 04-07-2025

### Added

- **Brand Assets**: Adição do logo oficial do projeto. Logo em formato SVG para máxima qualidade e escalabilidade
- **Dependencies**: Adição da biblioteca de ícones Lucide React
- **UI Components**: Criação do componente Button
  - Interface `ButtonProps` estendendo `ButtonHTMLAttributes` permitindo a máxima flexibilidade das propriedades
  - Enum `ButtonVariants` com variantes PRIMARY, SECONDARY e TEXT
  - Enum `ButtonSizes` com tamanhos SMALL, MEDIUM e LARGE
  - Suporte à acessibilidade com propriedade `ariaLabel`
  - Estilização para cada tipo de variant
  - Arquitetura modular com separação de tipos e enums em `Button.types.ts`
  - Sistema de barrel exports para importações otimizadas
- **UI Components**: Criação do componente Input
  - Interface `InputProps` estendendo `InputHTMLAttributes` permitindo a máxima flexibilidade das propriedades
  - Ícones customizáveis com posicionamento configurável
  - Funcionalidade de toggle de visibilidade de senha
  - Otimizações de performance com `useCallback`, `useMemo` e `useId`
  - Suporte à acessibilidade com propriedade `ariaLabel` e navegação por teclado
  - Arquitetura modular com separação de tipos em `Input.types.ts`
  - Sistema de barrel exports para importações otimizadas
- **Testing Infrastructure**: Implementação de testes manuais para os componentes criados

### Changed

- **Global Styling**: Novas variáveis CSS personalizadas para maior consistência visual
  - Implementação de breakpoints responsivos em `_breakpoints.scss`
  - Melhorias na tipografia e sistema de cores
  - Otimizações de performance no carregamento de estilos

## [0.5.0] - 10-07-2025

### Added

- **UI Components**: Alterações no componente Input
  - Criação da propriedade `label` para exibição de rótulos (nomes) acima dos campos de entrada
  - Adição da propriedade label, errors e registerField
  - Estilização específica para labels com espaçamento e tipografia adequados
  - Estilização específica para mensagens de erro no input

## [0.6.0] - 04-10-2025

### Added

- **Authentication System**: Implementação completa do sistema de autenticação
  - Middleware de autenticação (`middleware.ts`) com proteção de rotas e gerenciamento de sessões via cookies
  - Rotas públicas configuradas (`/login`, `/error`)
  - Redirecionamento automático para login em rotas protegidas sem autenticação
  - Sistema de tratamento de erros no middleware
- **Validation System**: Sistema robusto de validação de formulários
  - Schema centralizado de validação (`schemas.ts`) com Zod
  - Schema específico para login (`loginValidationSchema.ts`) com validação de CPF/CNPJ
  - Integração com React Hook Form usando `@hookform/resolvers`
  - Mensagens de validação padronizadas em `messages.ts`
- **Utilities**: Funções utilitárias para formatação e validação
  - Regex para validação de CPF (11 dígitos) e CNPJ (14 dígitos)
  - Função `maskCpfCnpj` para aplicação de máscara em CPF/CNPJ
  - Mensagens de erro padronizadas e reutilizáveis
- **Login Page**: Tela de login completa e funcional
  - Página de login (`login/page.tsx`) com metadata SEO otimizado
  - Componente de login (`login.tsx`) com formulário validado
  - Validação em tempo real de campos CPF/CNPJ e senha
  - Layout responsivo com imagem de background
  - Integração com componentes Button e Input
  - Estilização SCSS modular (`login.module.scss`)
- **Protected Routes**: Estrutura de rotas protegidas
  - Pasta `(protected)` criada para rotas autenticadas
  - Dashboard inicial (`dashboard/page.tsx`) configurado
  - Arquivo de actions para o dashboard (`actions.ts`)
  - Estilização modular do dashboard (`page.module.scss`)
  - Estrutura preparada para páginas de transações e transferências
- **Error Handling**: Página 404 personalizada
  - Componente `not-found.tsx` com design customizado
  - Metadata SEO para página de erro
  - Link de retorno para página inicial
  - Estilização inline responsiva
- **Font System**: Sistema de tipografia otimizado
  - Configuração de fontes Google (Geist e Geist Mono)
  - Variáveis CSS para fontes (`--font-geist-sans`, `--font-geist-mono`)
  - Integração com layout global
- **Project Structure**: Organização de pastas para componentes futuros
  - Estrutura preparada para componentes de feedback (Modal, Toast)
  - Estrutura preparada para componentes de layout (Header, SideMenu)
  - Estrutura preparada para componentes UI adicionais (Modal, Select)
  - Separação clara entre rotas públicas e protegidas

### Changed

- **Component Architecture**: Melhorias na arquitetura de componentes
  - Componentização mais granular com separação de responsabilidades
  - Uso de barrel exports para imports otimizados
  - Tipagem forte com TypeScript em todos os componentes

## [0.7.0] - 07-10-2025

### Added

- **Sistema de Login**: Implementação completa do fluxo de autenticação
  - Adicionado 3 usuários fakes para testes (CPF e CNPJ)
  - Validação de credenciais com toasts
- **Dashboard Protegido**: Página do dashboard sendo uma rota privada
  - Exibição das informações do usuário logado
  - Redirecionamento automático para login se não autenticado
  - Botão de logout
- **Gestão de Cookies**: Sistema seguro de autenticação com cookies httpOnly
  - Cookies com proteção contra XSS
  - Expiração automática do login em 7 dias
  - Integração com middleware para validação de rotas
- **Configurações gerais**: Adição da biblioteca de toasts react hot toast

### Changed

- **Layout da tela de Login**: Melhoria significativa no layout e estilização
- **Arquitetura de Autenticação**:
  - Ajustes no Middleware para validar cookies automaticamente
- **Componente Input**: Correção na captura de valores com react-hook-form

### Fixed

- Problema de redirecionamento após login com cookies
