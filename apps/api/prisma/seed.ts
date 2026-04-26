import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "alice@prisma.io",
      name: "Alice",
      todos: {
        create: [
          {
            title: "S'occupier de la tortue",
            realisedAT: new Date("2026-04-29"),
            description: "La tortue est très heureuse et adore être occupée. N'oubliez pas de vous occuper de la tortue tous les jours !",
          },
          {
            title: "Néttoyer la table",
            realisedAT: new Date("2026-04-12"),
            description: "Néttoyer la table est une tâche importante pour garder la maison propre. N'oubliez pas de nettoyer la table tous les jours !",
          },
        ],
      },
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: "bob@prisma.io" },
    update: {},
    create: {
      email: "bob@prisma.io",
      name: "Bob",
      todos: {
        create: [
          {
            title: "Promener le chien",
            realisedAT: new Date("2026-03-28"),
            description: "Promener le chien est essentiel pour sa santé et son bonheur. N'oubliez pas de promener le chien tous les jours !",
          },
          {
            title: "Aller jardiner avec grand-mère",
            realisedAT: new Date("2026-04-01"),
            description: "Aller jardiner avec grand-mère est une excellente occasion de passer du temps ensemble et d'apprendre de nouvelles choses sur les plantes. N'oubliez pas d'aller jardiner avec grand-mère tous les samedis !",
          },
        ],
      },
    },
  });

  console.log({ alice, bob });
}
main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
