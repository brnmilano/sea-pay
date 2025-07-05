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
