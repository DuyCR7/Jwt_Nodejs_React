import express from 'express';
import homeController from '../controller/HomeController';
import userController from '../controller/UserController';

const router = express.Router();

// express app
const initWebRoutes = (app) => {
    router.get('/', homeController.handleHelloWorld);
    router.get('/users', userController.handleGetUsers);

    return app.use('/', router);
}

export default initWebRoutes;