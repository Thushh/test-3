import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';

import { PORT, mongoDBURL } from "./config.js"; 
import projectsRoute from './routes/projectRoute.js';
import financesRoute from './routes/financeRoute.js';
import targetsRoute from './routes/targetRoute.js';
import teamsRoute from './routes/teamRoute.js';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS policy
app.use(cors());

app.get('/', (request, response) => {
    console.log(request); // Normally, you might not want to log the entire request in production!
    return response.send('Welcome to the Project Tracking App');
});

// Routes
app.use('/projects', projectsRoute);
app.use('/finances', financesRoute);
app.use('/targets', targetsRoute);
app.use('/teams', teamsRoute);

// MongoDB connection
mongoose
    .connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to the database');
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to the database: ', error);
    });
