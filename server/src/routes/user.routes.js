import express, { Router } from 'express'
const router = Router();

import {registerUser, login, getCurrentUser} from '../controllers/user.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { corsMiddleware } from '../middlewares/cors.middleware.js'

router.route("/register").post(corsMiddleware, registerUser)
router.route("/login").post(corsMiddleware, login)
router.route("/current-user").get(verifyJWT, getCurrentUser)



export default router;