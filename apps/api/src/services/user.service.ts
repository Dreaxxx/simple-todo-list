import { User } from "../generated/prisma/client";
import userRepository from "../repositories/user.repository";

async function readAll(): Promise<User[]> {
  return userRepository.readAll();
}

export default {
  readAll,
};
