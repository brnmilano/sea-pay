# 🐳 Comandos Docker - SEA-PAY

Guia rápido de comandos para build, teste e análise das imagens Docker otimizadas.

---

## 📋 Índice

- [1. Limpar Imagens Antigas](#1-limpar-imagens-antigas)
- [2. Build Imagem de Produção](#2-build-imagem-de-produção-otimizada)
- [3. Build Imagem de Desenvolvimento](#3-build-imagem-de-desenvolvimento)
- [4. Docker Compose (Recomendado)](#4-docker-compose-recomendado)
- [5. Comparar Tamanhos](#5-comparar-tamanhos)
- [6. Testar Imagem](#6-testar-imagem-de-produção)
- [7. Análise Detalhada](#7-análise-detalhada)
- [8. Troubleshooting](#8-troubleshooting)

---

## 1. 🧹 Limpar Imagens Antigas

```bash
# Parar todos os containers em execução
docker-compose down

# Remover imagem antiga (se existir)
docker rmi sea-pay-react:latest -f

# Limpar cache de build do Docker
docker builder prune -a

# Limpar imagens não utilizadas
docker image prune -a
```

---

## 2. 🔨 Build Imagem de Produção (Otimizada)

### Build

```bash
# Build da imagem de produção (otimizado)
docker build --target runner -t sea-pay:prod .

# Build sem usar cache (força o rebuild completo)
docker build --no-cache --target runner -t sea-pay:prod .
```

### Verificar

```bash
# Ver tamanho da imagem criada
docker images | grep sea-pay

# Listar todas as imagens locais
docker images

# Ver apenas a imagem de produção
docker images sea-pay:prod
```

### Analisar

```bash
# Analisar camadas da imagem
docker history sea-pay:prod --human

# Ver detalhes de cada camada
docker history sea-pay:prod --human --format "table {{.CreatedBy}}\t{{.Size}}"
```

---

## 3. 🛠️ Build Imagem de Desenvolvimento

```bash
# Build da imagem de desenvolvimento (com hot reload)
docker build --target development -t sea-pay:dev .

# Ver tamanho
docker images | grep sea-pay

# Comparar com produção
docker images | grep sea-pay | sort -k7 -h
```

---

## 4. Docker Compose (Recomendado)

### Desenvolvimento

```bash
# Subir ambiente de desenvolvimento
docker-compose up

# Subir em background (detached)
docker-compose up -d

# Rebuild e subir
docker-compose up --build

# Ver logs em tempo real
docker-compose logs -f app

# Ver logs das últimas 100 linhas
docker-compose logs --tail=100 app

# Parar containers
docker-compose down

# Parar e remover volumes
docker-compose down -v
```

### Produção

```bash
# Subir imagem de produção (otimizado)
docker-compose --profile production up app-prod

# Em background
docker-compose --profile production up -d app-prod

# Ver logs da produção
docker-compose --profile production logs -f app-prod

# Parar produção
docker-compose --profile production down
```

### Gerenciamento

```bash
# Ver status dos containers
docker-compose ps

# Reiniciar um serviço específico
docker-compose restart app

# Executar comando dentro do container
docker-compose exec app sh

# Ver uso de recursos
docker stats
```

---

## 5. 📊 Comparar Tamanhos

```bash
# Build ambas as imagens
docker build --target runner -t sea-pay:prod .
docker build --target development -t sea-pay:dev .

# Comparar tamanhos
docker images | grep sea-pay

# Formato de tabela detalhado
docker images sea-pay:prod sea-pay:dev --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}\t{{.CreatedAt}}"
```

### Resultado Esperado

| Imagem  | Tag  | Tamanho        | Descrição               |
| ------- | ---- | -------------- | ----------------------- |
| sea-pay | prod | **283MB**      | 🚀 Produção (otimizado) |
| sea-pay | dev  | **~500-800MB** | 🛠️ Desenvolvimento      |

---

## 6. 🧪 Testar Imagem de Produção

### Docker Run

```bash
# Run container de produção (porta 3000)
docker run -p 3000:3000 sea-pay:prod

# Run em background
docker run -d -p 3000:3000 --name sea-pay-prod sea-pay:prod

# Run com variáveis de ambiente
docker run -p 3000:3000 -e NODE_ENV=production sea-pay:prod

# Parar container
docker stop sea-pay-prod

# Remover container
docker rm sea-pay-prod
```

### Docker Compose

```bash
# Via docker-compose (recomendado)
docker-compose --profile production up app-prod

# Acessar aplicação
# http://localhost:3000
```

### Testar Endpoints

```bash
# Verificar se está rodando
curl http://localhost:3000

# Ver headers da resposta
curl -I http://localhost:3000

# Teste de health check (se configurado)
curl http://localhost:3000/api/health
```

---

## 7. 🔍 Análise Detalhada

### Camadas da Imagem

```bash
# Ver todas as camadas
docker history sea-pay:prod

# Ver com tamanhos legíveis
docker history sea-pay:prod --human

# Ver camadas completas (sem truncar)
docker history sea-pay:prod --no-trunc

# Formato customizado
docker history sea-pay:prod --human --format "table {{.CreatedBy}}\t{{.Size}}"
```

### Inspeção

```bash
# Inspecionar imagem completa
docker inspect sea-pay:prod

# Ver apenas configurações específicas
docker inspect sea-pay:prod --format='{{.Config.Env}}'
docker inspect sea-pay:prod --format='{{.Config.ExposedPorts}}'
docker inspect sea-pay:prod --format='{{.Size}}'

# Ver filesystem layers
docker inspect sea-pay:prod --format='{{json .RootFS.Layers}}' | jq
```

### Análise de Tamanho por Camada

```bash
# Ver top 10 maiores camadas
docker history sea-pay:prod --human | head -n 11

# Exportar análise para arquivo
docker history sea-pay:prod --human > image-analysis.txt

# Comparar duas imagens
diff <(docker history sea-pay:prod) <(docker history sea-pay-react:latest)
```

---

## 8. 🔧 Troubleshooting

### Problemas Comuns

```bash
# Container não inicia
docker-compose logs app

# Verificar portas em uso
netstat -an | grep 3000

# Remover container travado
docker rm -f sea-pay-dev

# Ver processos dentro do container
docker-compose exec app ps aux

# Acessar shell do container
docker-compose exec app sh

# Verificar variáveis de ambiente
docker-compose exec app env
```

### Performance

```bash
# Monitorar uso de recursos
docker stats sea-pay-dev

# Ver uso de disco
docker system df

# Limpar espaço
docker system prune -a
```

### Build Issues

```bash
# Rebuild forçado sem cache
docker-compose build --no-cache

# Ver logs detalhados do build
docker-compose build --progress=plain

# Verificar contexto do build
docker build --target runner -t sea-pay:prod . --progress=plain
```

---

## 📚 Comandos Úteis Rápidos

```bash
# Ver apenas IDs das imagens
docker images -q sea-pay

# Remover todas as imagens sea-pay
docker rmi $(docker images sea-pay -q)

# Copiar arquivo do container
docker cp sea-pay-dev:/app/package.json ./

# Ver logs com timestamp
docker-compose logs -f -t app

# Restart rápido
docker-compose restart app

# Atualizar imagem sem parar
docker-compose up -d --build app
```

---

## 🎯 Atalhos Recomendados

Adicione ao seu `.bashrc` ou `.zshrc`:

```bash
# Aliases úteis
alias dc='docker-compose'
alias dcu='docker-compose up'
alias dcd='docker-compose down'
alias dcl='docker-compose logs -f'
alias dps='docker ps'
alias dim='docker images'

# Funções úteis
dsh() {
  docker-compose exec "$1" sh
}

dlogs() {
  docker-compose logs -f --tail=100 "$1"
}
```

---

## 📖 Documentação Relacionada

- 🐳 [Dockerfile](../Dockerfile) - Dockerfile multi-stage otimizado
- 🔧 [docker-compose.yml](../docker-compose.yml) - Configuração do Docker Compose

---

## 💡 Dicas

> 💡 **Desenvolvimento:** Use sempre `docker-compose up` para desenvolvimento  
> 🚀 **Produção:** Use `--profile production` para imagem otimizada  
> 🧹 **Limpeza:** Execute `docker builder prune` regularmente  
> 📊 **Monitoramento:** Use `docker stats` para ver uso de recursos

---

**Última atualização:** 4 de outubro de 2025  
**Versão da imagem otimizada:** 283MB (redução de 81%)
