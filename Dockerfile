# ---------- deps ----------
FROM node:22-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# ---------- builder ----------
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# ---------- runner ----------
FROM gcr.io/distroless/nodejs20-debian12

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# copy standalone server
COPY --from=builder /app/.next/standalone ./

# copy static files
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["server.js"]
