# Boas-vindas ao seaPay, um site desktop de transferências de valores entre contas pessoais e lojistas.

![Minha imagem](https://github.com/user-attachments/assets/c56ff6fa-b334-452b-8697-e4310d4b399c)

## Iniciando o projeto

Primeiro, execute o servidor de desenvolvimento:

```bash
pnpm run dev
# ou
docker-compose up
# Ou em background
docker-compose up -d
```

## 🐳 Comandos úteis para desenvolvimento utilizando Docker

```bash
# Parar containers
docker-compose down
```

<!-- ### Produção (Imagem Otimizada)

```bash
# Build e run da imagem de produção
docker-compose --profile production up app-prod

# Build direto
docker build --target runner -t sea-pay:prod .
docker run -p 3000:3000 sea-pay:prod
``` -->

📖 **Documentação completa:** Veja [docker-commands.md](docker\docker-commands.md)
