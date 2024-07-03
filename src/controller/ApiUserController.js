import apiUserService from "../service/ApiUserService";

const readFunc = async (req, res) => {
    try {
        // console.log("Check req.user: ", req.user);
        // console.log(req.query);
        let search = req.query.search || "";
        let sortConfig = req.query.sort ? JSON.parse(req.query.sort) : {key: 'id', direction: 'DESC'};

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
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;
    let phone = req.body.phone;

     // Lấy buffer từ file upload
     const fileBuffer = req.file.buffer;
        
     // Chuyển đổi buffer sang base64
     const base64Image = fileBuffer.toString('base64');

    let dataUser = {
        email,
        password,
        username,
        phone,
        image: base64Image
    }
    
    try {
        // validate

        // create
        let data = await apiUserService.createUser(dataUser);

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

        let id = req.body.id;

        let user = await apiUserService.getUserById(id);
        if (!user) {
            return res.status(200).json({
                EM: 'User not found!',   // error message
                EC: 1,   // error code
                DT: '',   // data
            });
        }

        let address = req.body.address;
        let username = req.body.username;
        let sex = req.body.sex;
        let groupId = req.body.groupId;

        let base64Image = user.image;
        if (req.file) {
            // Lấy buffer từ file upload
            const fileBuffer = req.file.buffer;
                
            // Chuyển đổi buffer sang base64
            base64Image = fileBuffer.toString('base64');
        }

        let dataUser = {
            id,
            address,
            username,
            sex,
            groupId,
            image: base64Image
        }

        // create
        let data = await apiUserService.updateUser(dataUser);

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
        return res.status(200).json({
            EM: 'Ok',   // error message
            EC: 0,   // error code
            DT: {
                access_token: req.token,
                groupWithRoles: req.user.groupWithRoles,
                email: req.user.email,
                username: req.user.username,
                id: req.user.id,
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