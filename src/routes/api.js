import express from 'express';
import apiAuthController from "../controller/ApiAuthController";
import apiUserController from "../controller/ApiUserController";
import apiRoleController from "../controller/ApiRoleController";
import apiGroupController from "../controller/ApiGroupController";
import { checkUserJWT, checkUserPermission } from "../middlewares/JWTAction";

const router = express.Router();

// express app
const initApiRoutes = (app) => {

    router.all("*", checkUserJWT, checkUserPermission);

    router.post("/register", apiAuthController.handleRegister);
    router.post("/login", apiAuthController.handleLogin);
    router.post("/logout", apiAuthController.handleLogout);
    router.post("/refresh-token", apiAuthController.handleRefreshToken);
    
    router.get("/account", apiUserController.getUserAccount);

    // user routes
    router.get("/user/read", apiUserController.readFunc);
    router.post("/user/create", apiUserController.createFunc);
    router.put("/user/update", apiUserController.updateFunc);
    router.delete("/user/delete", apiUserController.deleteFunc); 
    router.get("/user/get-by-id/:id", apiUserController.getUserByIdFunc);

    // roles routes
    router.get("/role/read", apiRoleController.readFunc);
    router.post("/role/create", apiRoleController.createFunc);
    router.put("/role/update", apiRoleController.updateFunc);
    router.put("/role/delete", apiRoleController.deleteFunc);
    router.get("/role/by-group/:groupId", apiRoleController.getRoleByGroupFunc);
    router.post("/role/assign-to-group", apiRoleController.assignRoleToGroupFunc);
    router.post("/role/delete-many", apiRoleController.deleteManyFunc);
    router.get("/role/read-trash", apiRoleController.readTrashFunc);
    router.put("/role/restore", apiRoleController.restoreFunc);
    router.post("/role/restore-many", apiRoleController.restoreManyFunc);

    // group routes
    router.get("/group/read", apiGroupController.readFunc);

    return app.use('/api/v1/', router);
}

export default initApiRoutes;