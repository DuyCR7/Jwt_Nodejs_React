import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import initApiRoutes from './routes/api';
import bodyParser from 'body-parser';
import configCORS from './config/cors';
// import connection from './config/connectDB';
require('dotenv').config();

const app = express();

// config CORS
configCORS(app);

// config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// config view engine
configViewEngine(app);

// test connectionDB
// connection();

// init web routes
initWebRoutes(app);
initApiRoutes(app);

const POST = process.env.PORT || 8080;
app.listen(POST, () => {
    console.log(`Server is running on port ${POST}`);
});