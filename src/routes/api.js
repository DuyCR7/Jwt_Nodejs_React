import express from 'express';
import apiController from "../controller/ApiController";

const router = express.Router();

// express app
const initApiRoutes = (app) => {

    router.post("/register", apiController.handleRegister)

    return app.use('/api/v1/', router);
}

export default initApiRoutes;