import apiRoleService from "../service/ApiRoleService";

const readFunc = async (req, res) => {
    try {
        // console.log("Check req.user: ", req.user);
        // console.log(req.query);
        if(req.query.page && req.query.limit){
            let page = req.query.page
            let limit = req.query.limit

            let data = await apiRoleService.getRoleWithPagination(+page, +limit);

            return res.status(200).json({
                EM: data.EM,   // error message
                EC: data.EC,   // error code
                DT: data.DT,   // data
            });
        } else {
            let data = await apiRoleService.getAllRoles();

            return res.status(200).json({
                EM: data.EM,   // error message
                EC: data.EC,   // error code
                DT: data.DT,   // data
            });
        }
    
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'Error form server!',   // error message
            EC: -1,   // error code
            DT: '',   // data
        })
    }
}

const createFunc = async (req, res) => {
    try {
        // validate

        // create
        let data = await apiRoleService.createRoles(req.body);

        return res.status(200).json({
            EM: data.EM,   // error message
            EC: data.EC,   // error code
            DT: data.DT,   // data
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'Error form server!',   // error message
            EC: -1,   // error code
            DT: '',   // data
        })
    }
}

const updateFunc = async (req, res) => {
    try {
        // validate

        // create
        let data = await apiRoleService.updateRole(req.body);

        return res.status(200).json({
            EM: data.EM,   // error message
            EC: data.EC,   // error code
            DT: data.DT,   // data  
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'Error form server!',   // error message
            EC: -1,   // error code
            DT: '',   // data
        })
    }
}

const deleteFunc = async (req, res) => {
    try {
        // console.log(req.body);
        let data = await apiRoleService.deleteRole(req.body);

        return res.status(200).json({
            EM: data.EM,   // error message
            EC: data.EC,   // error code
            DT: data.DT,   // data
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'Error form server!',   // error message
            EC: -1,   // error code
            DT: '',   // data
        })
    }
}

const getRoleByGroupFunc = async (req, res) => {
    try {
        let id = req.params.groupId;

        let data = await apiRoleService.getRoleByGroup(id);

        return res.status(200).json({
            EM: data.EM,   // error message
            EC: data.EC,   // error code
            DT: data.DT,   // data
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'Error form server!',   // error message
            EC: -1,   // error code
            DT: '',   // data
        })
    }
}

const assignRoleToGroupFunc = async (req, res) => {
    try {

        let data = await apiRoleService.assignRoleToGroup(req.body.data);

        return res.status(200).json({
            EM: data.EM,   // error message
            EC: data.EC,   // error code
            DT: data.DT,   // data
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'Error form server!',   // error message
            EC: -1,   // error code
            DT: '',   // data
        })
    }
}

const deleteManyFunc = async (req, res) => {
    // console.log("ids: ", req.body)
    try {
        let ids = req.body;
        let data = await apiRoleService.deleteMany(ids);

        return res.status(200).json({
            EM: data.EM,   // error message
            EC: data.EC,   // error code
            DT: data.DT,   // data
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'Error form server!',   // error message
            EC: -1,   // error code
            DT: '',   // data
        })
    }
}

const readTrashFunc = async (req, res) => {
    try {
        let data = await apiRoleService.readTrash();

        return res.status(200).json({
            EM: data.EM,   // error message
            EC: data.EC,   // error code
            DT: data.DT,   // data
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'Error form server!',   // error message
            EC: -1,   // error code
            DT: '',   // data
        })
    }
}

const restoreFunc = async (req, res) => {
    try {
        // console.log(req.body);
        let data = await apiRoleService.restoreRole(req.body);

        return res.status(200).json({
            EM: data.EM,   // error message
            EC: data.EC,   // error code
            DT: data.DT,   // data
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'Error form server!',   // error message
            EC: -1,   // error code
            DT: '',   // data
        })
    }
}

const restoreManyFunc = async (req, res) => {
    // console.log("ids: ", req.body)
    try {
        let ids = req.body;
        let data = await apiRoleService.restoreMany(ids);

        return res.status(200).json({
            EM: data.EM,   // error message
            EC: data.EC,   // error code
            DT: data.DT,   // data
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'Error form server!',   // error message
            EC: -1,   // error code
            DT: '',   // data
        })
    }
}

module.exports = {
    readFunc,
    createFunc,
    updateFunc,
    deleteFunc,
    getRoleByGroupFunc,
    assignRoleToGroupFunc,
    deleteManyFunc,
    readTrashFunc,
    restoreFunc,
    restoreManyFunc
}