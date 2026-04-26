# Prisma

Ce projet utilise Prisma avec PostgreSQL via Docker.

## Prerequis

- Etre place dans `apps/api`
- Avoir lance PostgreSQL via Docker depuis la racine du projet

```bash
cd /home/*user*/starter-fullstack-blecarpentier
bun run db:up
```

## Variable d'environnement

Dans `apps/api/.env`, il faut remplir pour le test:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/monorepo?schema=public
```

Cette valeur correspond au `docker-compose.yml` qui a été fournis par le super Lead Dev qui a initialisé le projet :

- user : `user`
- password : `password`
- database : `monorepo`
- port : `5432`

## Fichiers utiles

- `prisma/schema.prisma` : structure de la base
- `prisma/seed.ts` : donnees initiales
- `prisma.config.ts` : configuration Prisma
- `src/generated/prisma` : client Prisma genere

## Installation

Depuis `apps/api` :

```bash
bun install
```

## Etapes Prisma

### 1. Generer le client Prisma

```bash
bunx prisma generate
```

Cette commande regenere le client a partir du schema actuel.

### 2. Appliquer le schema a la base

Option rapide :

```bash
bunx prisma db push
```

## Seed

Le seed est configure dans `prisma.config.ts` avec :

```ts
seed: "tsx prisma/seed.ts"
```

Pour lancer le seed :

```bash
bunx prisma db seed
```

Le seed actuel cree ou met a jour des utilisateurs puis leur associe quelques todos.

## COmmandes complètes suggérées

Depuis `apps/api` :

```bash
bun install
bunx prisma generate
bunx prisma migrate dev --name init
bunx prisma db seed
```

Si la base existe deja et que tu veux juste resynchroniser vite :

```bash
bunx prisma generate
bunx prisma db push
bunx prisma db seed
```

## Verifier que tout fonctionne

### Prisma Studio

```bash
bunx prisma studio
```

### Le seed ne marche pas

Verifier dans cet ordre :

1. Docker tourne bien
2. `DATABASE_URL` est correcte
3. `bunx prisma generate` a bien ete lance
4. le schema a bien ete applique avec `migrate dev` ou `db push`
