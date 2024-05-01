import crypto from 'crypto';

export function getSalt() {
  return crypto.randomBytes(16).toString('hex'); //generamos una cadena aleatoria de 16 bytes, por ejemplo "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6"
}

export function hashPassword(password: string) {
  return crypto.createHash('sha256').update(password).digest('hex'); //encriptamos la contraseña con el algoritmo sha256
}