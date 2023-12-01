import './db/conn.mjs'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import session from "express-session";
import MongoDBStore from "connect-mongo";
import mongoose from 'mongoose';
import { userRoutes, sessionRoutes } from './routes/index.mjs';

const PORT = process.env.PORT || 5050
const NODE_ENV = process.env.NODE_ENV || 'development';
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(session({
  name: process.env.SESS_NAME,
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoDBStore.create({
    client: mongoose.connection.getClient(),
    collection: 'session',
    ttl: parseInt(process.env.SESS_LIFETIME) / 1000
  }),
  cookie: {
    sameSite: true,
    secure: NODE_ENV === 'production',
    maxAge: parseInt(process.env.SESS_LIFETIME)
  }
}));

const apiRouter = express.Router();
app.use('/api', apiRouter);
apiRouter.use('/users', userRoutes);
apiRouter.use('/session', sessionRoutes);


// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
