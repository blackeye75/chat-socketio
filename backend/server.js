import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import authRouter from './routes/auth.routes.js';
import messageRouter from './routes/message.route.js';
import path from 'path';
import { connectDB } from './lib/db.js';


const app = express();
// const __dirname = path.resolve();

const PORT = process.env.PORT || 3000;
app.use(express.json());


app.use('/api/auth', authRouter)
app.use('/api/message', messageRouter)


// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.get(/.*/, (_, res) => {
//     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//   });
// }

app.listen(3000, () => {
  connectDB();
  console.log('Server is running on port 3000');
});