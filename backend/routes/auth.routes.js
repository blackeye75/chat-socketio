import express from 'express';
import { signup } from '../controller/auth.controller.js';

const authRouter = express.Router();

authRouter.get('/signup', signup )

export default authRouter
