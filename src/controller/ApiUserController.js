import apiUserService from "../service/ApiUserService";

const readFunc = async (req, res) => {
    try {
        // console.log("Check req.user: ", req.user);
        // console.log(req.query);
        let search = req.query.search || "";
        let sortConfig = req.query.sort ? JSON.parse(req.query.sort) : {key: 'id', direction: 'ASC'};

        if(req.query.page && req.query.limit){
            let page = req.query.page
            let limit = req.query.limit

            let data = await apiUserService.getUserWithPagination(+page, +limit, search, sortConfig);

            return res.status(200).json({
                EM: data.EM,   // error message
                EC: data.EC,   // error code
                DT: data.DT,   // data
            });
        } else {
            let data = await apiUserService.getAllUsers();

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
        let data = await apiUserService.createUser(req.body);

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
        let data = await apiUserService.updateUser(req.body);

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
        let data = await apiUserService.deleteUser(req.body.id);

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

    const getUserAccount = async (req, res) => {
        // console.log(req.user);
        return res.status(200).json({
            EM: 'Ok',   // error message
            EC: 0,   // error code
            DT: {
                access_token: req.token,
                groupWithRoles: req.user.groupWithRoles,
                email: req.user.email,
                username: req.user.username,
                id: req.user.id
            },   // data
        }); 
    }

const getUserByIdFunc = async (req, res) => {
    try {
        let id = req.params.id;
        let data = await apiUserService.getUserById(id);

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
    getUserAccount,
    getUserByIdFunc
}