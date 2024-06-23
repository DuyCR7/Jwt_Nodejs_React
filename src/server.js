require('dotenv').config();
import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import initApiRoutes from './routes/api';
import bodyParser from 'body-parser';
import configCORS from './config/cors';
// import connection from './config/connectDB';
import cookieParser from 'cookie-parser';

const app = express();

// config CORS
configCORS(app);

// config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// config view engine
configViewEngine(app);

// config cookie-parser
app.use(cookieParser())

// test connectionDB
// connection();

// init web routes
initWebRoutes(app);
initApiRoutes(app);

// req => middleware => res
app.use((req, res) => {
    return res.send("404 Not Found!");
});

const POST = process.env.PORT || 8080;
app.listen(POST, () => {
    console.log(`Server is running on port ${POST}`);
});