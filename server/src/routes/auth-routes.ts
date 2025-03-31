import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  console.log('Received username:', username);

  try {
    // Check if the user exists
    const user = await User.findOne({
      where: { username },
    });

    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'Authentication user failed' });
    }

    console.log('User found, checking password...');

    // Compare the password with the hash stored in the database
    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      console.log('Invalid password');
      return res.status(401).json({ message: 'Authentication password failed' });
    }

    console.log('Password valid, generating JWT token...');
    
    // Generate JWT token with expiration time of 1 hour
    const secretKey = process.env.JWT_SECRET_KEY || 'handsome';
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

    console.log('Token generated:', token);

    // Return the token in the response
    return res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
