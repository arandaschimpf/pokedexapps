import jwt from "jsonwebtoken"

const secret = 'mysecret'

export const signJWT = (payload: any) => {
  return jwt.sign(payload, secret)
}

export const verifyJWT = (token: string|undefined) => {
  if(!token){
    return false
  }
  return jwt.verify(token, secret)
}