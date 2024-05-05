import { Request, Response } from 'express';
import { validateLogin, validateSignup } from '../helpersB/authHelpers';

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (validateLogin(username, password)) {
    res.status(200).send({ message: 'Login successful' });
  } else {
    res.status(401).send({ message: 'Login failed' });
  }
};

export const signup = (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (validateSignup(username, password)) {
    res.status(201).send({ message: 'Signup successful' });
  } else {
    res.status(400).send({ message: 'Signup failed' });
  }
};
