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
            title: "Pet the turtle",
            realisedAT: new Date("2026-04-12"),
            description: "The turtle is very cute and loves pets. Don't forget to pet it every day!",
          },
          {
            title: "Clean the table",
            realisedAT: new Date("2026-04-02"),
            description: "The table is dirty and needs to be cleaned. Don't forget to clean it every day!",
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
            title: "Go outside with the dog",
            realisedAT: new Date("2026-03-28"),
            description: "The dog is very happy and loves to go outside. Don't forget to go outside with the dog every day!",
          },
          {
            title: "Gardening with grandmother",
            realisedAT: new Date("2026-04-01"),
            description: "Gardening is a great way to spend time with grandmother. Don't forget to go gardening with grandmother every week!",
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
