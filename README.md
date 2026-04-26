# Starter Fullstack (entretien)

## Phase 1

### TEMPS : 1h30

### Contexte

Le Lead Dev vous a laissé à disposition une application full stack initialisée en temps que monorepo sous le runtime Bun (au lieu de Node). Vous avez donc le squelette de l'api et du front, il a aussi eu le temps de vous faire le docker-compose pour la persistance des données.

### Technologies

- **Runtime** : Bun
- **Langage** : TypeScript
- **Front** : Vite + React + React Router + TanStack Query
- **Back** : Hono
- **Persistance** : PostgreSQL (Docker)

### Problématique

Vous devez réaliser une application **Todo-List** avec les technologies imposées ci-dessus. Vous avez la liberté de choisir :

- L'ORM (Drizzle, Prisma, ou aucun.)
- La librairie UI (shadcn/ui, Radix, ou aucune.)
- Toute autre dépendance jugée utile

### Conditions

- Ne pas utiliser d'IA.
- Faire du mieux que vous pouvez avec le temps imparti

### Structure du projet

```sh
@starter-fullstack/
├── apps/
│   ├── api/                  # Serveur Hono
│   │   └── src/
│   │       ├── routes/       # Endpoints (todos.ts, ...)
│   │       ├── db/           # Client DB + migrations
│   │       ├── types/        # Interfaces TypeScript
│   └── web/                  # Client React
│       └── src/
│           ├── pages/        # TodosPage, ...
│           ├── components/   # Composants réutilisables
│           ├── types/        # Interfaces TypeScript
├── docker-compose.yml
├── package.json              # Workspaces + scripts racine
└── .env                      # Variables d'environnement
```

## Lancement

```bash
# 1.
bun install

# 2. BDD
bun run db:up

# 3. Concurrence monorepo (racine).
bun run dev
```

## Commandes utiles

| Commande           | Description                                     |
| ------------------ | ----------------------------------------------- |
| `bun run dev`      | Lance l'API (port 3000) et le front (port 5173) |
| `bun run db:up`    | Démarre PostgreSQL via Docker                   |
| `bun run db:down`  | Arrête PostgreSQL                               |
| `bun run db:reset` | Recrée la base (supprime les données)           |
| `bun install XXX`  | Installe le composant XXX                       |

Bun est similaire à Npm.


## Conseils

- Le but est de nous montrer ce que vous savez faire dans un temps imparti.
- L'implémentation est libre. Ne perdez pas trop de temps sur des technos que vous ne connaissez/maitrisez pas.
- Si vous bloquez, n'hésitez pas à nous prévenir ou à demander de l'aide.

## Phase 2

Une série de Questions/Réponses seront attendus sur ce que vous avez livré.
