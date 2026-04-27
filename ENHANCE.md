# Axes d'amelioration

Le projet est volontairement resté simple et lisible. Si je souhaitais aller plus loin, voici les principaux axes d'amelioration que j'envisagerai.

## Back-end

- Ajouter un middleware ou une couche de validation plus standardisée pour les routes.
- Ajouter une couche d'authentification et d'autorisation.
- Mieux centraliser la gestion des erreurs HTTP et des messages de retour.
- Aller plus loin dans l'optimisation des services Prisma en distinguant mieux les lectures simples, les mises a jour et les cas plus metier.
- Ajouter une gestion plus fine des requetes Prisma avec pagination, tri et filtres cote API.
- Mieux separer les DTO d'entree, les types de sortie API et les types de persistence.
- Ajouter des logs applicatifs plus propres pour faciliter le debug.
- Ajout du CRUD pour les users.

## Front-end

- Mieux factoriser encore certaines logiques React Query si le projet grandit.
- Ajouter des formulaires avec validation utilisateur plus explicite.
- Ajouter des retours UX plus complets sur les erreurs, succes et chargements (comme des toasters par exemple).
- Ameliorer l'accessibilite generale de l'interface.
- Ajouter une vraie gestion des etats vides, des confirmations et des cas limites.
- Rajouter redux pour une meiolleur gestion des states dans l'application et moins utiliser le passage en props aux composants.
- Prevoir une meilleure organisation des composants si l'application grossit.

## Qualite

- Ajouter des tests unitaires sur les helpers, services et fonctions utilitaires.
- Ajouter des tests d'integration sur les routes API.
- Ajouter des tests front sur les composants principaux et les interactions utilisateur.
- Ajouter des tests end-to-end pour les scenarios critiques(Playwright dans mon cas).
- Renforcer les conventions de code avec lint, formatage et eventuellement hooks Git (J'utilise beaucoup Husky, ESLint, Prettier de base).

## Fonctionnel

- Ajouter une vraie edition complè
te des todos avec retours de succes ou d'echec plus detailles.
- Ajouter des filtres supplementaires comme "attribue / non attribue" ou "a faire / en retard".
- Ajouter une gestion plus claire des dates metier selon le besoin reel: date cible, date de fin, date de realisation de la tache, etc.
