import express from 'express';
import homeController from '../controller/HomeController';
import userController from '../controller/UserController';

const router = express.Router();

// express app
const initWebRoutes = (app) => {
    router.get('/', homeController.handleHelloWorld);
    router.get('/users', userController.handleGetUsers);
    router.post('/users/store', userController.handleStoreNewUser);
    router.post('/users/delete/:id', userController.handleDeleteUser);
    router.get('/users/edit/:id', userController.getEditUserPage);
    router.post('/users/update/:id', userController.handleUpdateUser);

    return app.use('/', router);
}

export default initWebRoutes;