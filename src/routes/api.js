import express from 'express';
import apiAuthController from "../controller/ApiAuthController";
import apiUserController from "../controller/ApiUserController";
import apiGroupController from "../controller/ApiGroupController";
import { checkUserJWT, checkUserPermission } from "../middlewares/JWTAction";

const router = express.Router();

// express app
const initApiRoutes = (app) => {

    router.post("/register", apiAuthController.handleRegister)
    router.post("/login", apiAuthController.handleLogin)

    router.get("/user/read", checkUserJWT, checkUserPermission, apiUserController.readFunc);
    router.post("/user/create", apiUserController.createFunc);
    router.put("/user/update", apiUserController.updateFunc);
    router.delete("/user/delete", apiUserController.deleteFunc); 

    router.get("/group/read", apiGroupController.readFunc);

    return app.use('/api/v1/', router);
}

export default initApiRoutes;