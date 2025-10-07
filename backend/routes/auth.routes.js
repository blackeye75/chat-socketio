import express from 'express';

const authRouter = express.Router();

authRouter.get('/signup', (req,res)=>{
  res.send("Hello from signup")
} )

export default authRouter
