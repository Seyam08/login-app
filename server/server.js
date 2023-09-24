/* eslint-disable import/extensions */
import cors from 'cors';
import express from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import morgan from 'morgan';
import router from './router/route.js';

const app = express();

// server port
const port = 8000;

// database connection
async function connect() {
    try {
        const mongodb = await MongoMemoryServer.create();
        const getUri = mongodb.getUri();
        mongoose.set('strictQuery', true);
        await mongoose.connect(getUri);
        console.log('Database connection successful');
    } catch (err) {
        console.log(err);
    }
}
connect();
// middleware
app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());
app.disable('x-powered-by');
app.use('/api', router);

// home get req
app.get('/', (req, res) => {
    res.status(201).send('home get request');
});

/** start server only when we have valid connection */
app.listen(port, () => {
    console.log(`server running on ${port} port`);
});
