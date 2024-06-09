import express from 'express';
import homeController from '../controller/HomeController';

const router = express.Router();

// express app
const initWebRoutes = (app) => {
    router.get('/', homeController.handleHelloWorld);

    return app.use('/', router);
}

export default initWebRoutes;