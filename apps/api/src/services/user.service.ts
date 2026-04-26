import userRepository from "../repositories/user.repository";

async function readAll() {
  return userRepository.readAll();
}

export default {
  readAll,
};
