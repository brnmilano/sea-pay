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
