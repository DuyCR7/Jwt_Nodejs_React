import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import bodyParser from 'body-parser';
// import connection from './config/connectDB';
require('dotenv').config();

const app = express();

// config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// config view engine
configViewEngine(app);

// test connectionDB
// connection();

// init web routes
initWebRoutes(app);

const POST = process.env.PORT || 8080;
app.listen(POST, () => {
    console.log(`Server is running on port ${POST}`);
});