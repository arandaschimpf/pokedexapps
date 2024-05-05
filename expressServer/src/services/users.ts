import type { User } from "../../db/users";
import * as usersDB from "../../db/users";
import { getSalt, hashPassword } from "../helpers/hashPassword";
import { validarEmail } from "../helpers/validation";

export async function createUser(user: { email: string; password: string }) {
  if (
    !user.email ||
    user.email.length < 5 ||
    !user.email.includes("@") ||
    !validarEmail(user.email)
  ) {
    throw new Error("Invalid email");
  }
  const existing = await usersDB.findByEmail(user.email);
  if (existing) {
    throw new Error("Already exists");
  }
  if (!user.password || user.password.length < 8) {
    throw new Error("Password too short");
  }

  const salt = getSalt();
  const userWithHash: User = {
    email: user.email,
    hash: hashPassword(salt + user.password),
    salt,
  };

   usersDB.createUser(userWithHash);
   return "Registro exitoso"
}

export async function authenticateUser(user: {
  email: string;
  password: string;
}) {
  const existing = await usersDB.findByEmail(user.email);
  if (!existing) {
    throw new Error("User not found");
  }
  const hash = hashPassword(existing.salt + user.password);
  if (hash !== existing.hash) {
    throw new Error("Invalid password");
  }
  return { email: existing.email };
}
