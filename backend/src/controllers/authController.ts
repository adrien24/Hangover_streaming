import { Request, Response } from 'express'
import User from '../models/user'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body

    // Vérification si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { username } })
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' })
      return
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10)

    // Création de l'utilisateur
    const user = await User.create({
      id: Math.floor(Math.random() * 10000000),
      username,
      password: hashedPassword,
    })
    res.status(201).json({ message: 'User created successfully', user })
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body

    // Vérification si l'utilisateur existe
    const user = await User.findOne({ where: { username } })
    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    // Vérification du mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid password' })
      return
    }

    // Génération du token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: '7d',
    })

    res.status(200).json({ message: 'Login successful', token })
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export const verifyToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (error, decoded) => {
      if (error) {
        res.status(401).json({ message: 'Unauthorized' })
        return
      }

      res.status(200).json({ message: 'Token is valid', decoded })
    })
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}
