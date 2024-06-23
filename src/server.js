import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import initApiRoutes from './routes/api';
import bodyParser from 'body-parser';
import configCORS from './config/cors';
// import connection from './config/connectDB';
require('dotenv').config();
import { createJWT, verifyToken } from "./middlewares/JWTAction";

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

// test JWT
createJWT();
let decodedData = verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0IiwibmFtZSI6InRlc3QiLCJpYXQiOjE3MTkxMTQ1NTV9.50RZSEF4sWqsC4XafHlsJRFA51mn85g5J_9Ut-jJ724");
console.log(decodedData);

// init web routes
initWebRoutes(app);
initApiRoutes(app);

const POST = process.env.PORT || 8080;
app.listen(POST, () => {
    console.log(`Server is running on port ${POST}`);
});