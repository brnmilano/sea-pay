# syntax=docker.io/docker/dockerfile:1

# ==========================================
# Stage 1: Dependências (Development)
# ==========================================
FROM node:18-alpine AS deps
WORKDIR /app

# Instalar libc6-compat para compatibilidade
RUN apk add --no-cache libc6-compat

# Copiar arquivos de dependências
COPY package.json pnpm-lock.yaml* package-lock.json* ./

# Instalar dependências
RUN \
  if [ -f pnpm-lock.yaml ]; then \
  corepack enable pnpm && pnpm i --frozen-lockfile; \
  elif [ -f package-lock.json ]; then \
  npm ci; \
  else \
  npm install; \
  fi

# ==========================================
# Stage 2: Builder (Build da aplicação)
# ==========================================
FROM node:18-alpine AS builder
WORKDIR /app

# Copiar node_modules da stage anterior
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Desabilitar telemetria do Next.js
ENV NEXT_TELEMETRY_DISABLED=1

# Build da aplicação
RUN \
  if [ -f pnpm-lock.yaml ]; then \
  corepack enable pnpm && pnpm run build; \
  else \
  npm run build; \
  fi

# ==========================================
# Stage 3: Runner (Produção - Imagem Final)
# ==========================================
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Criar usuário não-root para segurança
RUN addgroup --system --gid 1001 nodejs && \
  adduser --system --uid 1001 nextjs

# Copiar arquivos necessários do builder
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]

# ==========================================
# Stage 4: Development (Modo desenvolvimento)
# ==========================================
FROM node:18-alpine AS development
WORKDIR /app

# Instalar libc6-compat
RUN apk add --no-cache libc6-compat

# Copiar package files
COPY package.json pnpm-lock.yaml* package-lock.json* ./

# Instalar todas as dependências (incluindo dev)
RUN \
  if [ -f pnpm-lock.yaml ]; then \
  corepack enable pnpm && pnpm i; \
  elif [ -f package-lock.json ]; then \
  npm ci; \
  else \
  npm install; \
  fi

# Copiar código fonte
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]