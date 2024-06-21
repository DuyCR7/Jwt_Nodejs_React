import db from "../models/index";

const getAllUsers = async () => {
    try {
        let users = await db.User.findAll({
            attributes: ['id', 'email', 'username', 'phone', 'sex'],
            include: {model: db.Group, attributes: ['name', 'description']}
        });
        if (users) {
            return {
                EM: "Get all users successfully!",
                EC: 0,
                DT: users
            }
        } else {
            return {
                EM: "Get all users successfully!",
                EC: 0,
                DT: []
            }
        }
        
    } catch (e) {
        console.log(e);
        return {
            EM: "Something went wrongs!",
            EC: -1,
            DT: [],
        };
    }
}

const getUserWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;

        const { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ['id', 'email', 'username', 'phone', 'sex'],
            include: {model: db.Group, attributes: ['name', 'description']}
        })

        let data = {
            totalRows: count,
            totalPages: Math.ceil(count / limit),
            users: rows
        }

        return {
            EM: "Get user with pagination successfully!",
            EC: 0,
            DT: data
        }

    } catch (e) {
        console.log(e);
        return {
            EM: "Something went wrongs!",
            EC: -1,
            DT: [],
        };
    }
}

const createUser = async (data) => {
    try {
        await db.User.create({

        });
    } catch (e) {
        console.log(e);
        return {
            EM: "Something went wrongs!",
            EC: -1,
            DT: '',
        };
    }
}

const updateUser = async (data) => {
    try {
        let user = await db.User.findOne({
            where: {
                id: data.id
            }
        })
        if (user) {
            // update
            user.save({

            });
        } else {
            // not found
        }
    } catch (e) {
        console.log(e);
        return {
            EM: "Something went wrongs!",
            EC: -1,
            DT: '',
        };
    }
}

const deleteUser = async (id) => {
    try {
        await db.User.delete({
            where: {
                id: id
            }
        })
    } catch (e) {
        console.log(e);
        return {
            EM: "Something went wrongs!",
            EC: -1,
            DT: '',
        };
    }
}

module.exports = {
    getAllUsers,
    getUserWithPagination,
    createUser,
    updateUser,
    deleteUser,
}