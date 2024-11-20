import express, { Application } from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import sequelize from './config/db'
import authRoutes from './routes/auth'

dotenv.config()

const app: Application = express()
const PORT = process.env.PORT || 5050

// Middleware
app.use(bodyParser.json())

// Routes
app.use('/api/auth', authRoutes)

// Synchroniser les modèles avec la base de données
sequelize.sync().then(() => console.log('Database synchronized'))

// Lancer le serveur
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
