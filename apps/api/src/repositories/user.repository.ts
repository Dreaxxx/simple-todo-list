import { prisma } from "../lib/prisma";

async function readAll() {
  return prisma.user.findMany({
    orderBy: { name: "asc" },
  });
}

export default {
  readAll,
};
