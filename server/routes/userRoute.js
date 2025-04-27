import express from 'express'
import { isAuth, login, logout, register } from '../controllers/userController.js'
import { authUser } from '../middleware/authMiddleware.js'


const UserRouter = express.Router()

UserRouter.post('/register', register)
UserRouter.post('/login',login)
UserRouter.get('/is-auth', authUser, isAuth)
UserRouter.get('/logout', authUser,logout)

export default UserRouter