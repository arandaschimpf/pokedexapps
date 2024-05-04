import crypto from 'crypto';

export function getSalt() {
  return crypto.randomBytes(16).toString('hex');
}

//Utiliza la libreria de crypto para generar un hash.
export function hashPassword(password: string) {
  return crypto.createHash('sha256').update(password).digest('hex');
}