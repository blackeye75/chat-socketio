import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import authRouter from './routes/auth.routes.js';
import messageRouter from './routes/message.route.js';


const app = express();

const PORT = process.env.PORT || 3000;



app.use('/api/auth', authRouter)
app.use('/api/message', authRouter)

app.listen(3000, () => { console.log('Server is running on port 3000'); });