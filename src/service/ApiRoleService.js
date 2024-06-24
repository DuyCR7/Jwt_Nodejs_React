import db from "../models/index";

const createRoles = async (roles) => {
    try {
        let currentRoles = await db.Role.findAll({
            attributes: ['url', 'description']
        })

        const persists = roles.filter(({ url: url1 }) => !currentRoles.some(({ url: url2}) => url1 === url2));
        // console.log(persists);

        // console.log(currentRoles);
        if(persists.length === 0){
            return {
                EM: "Nothing to create!",
                EC: 0,
                DT: []
            }
        }

        await db.Role.bulkCreate(persists);
    
        return {
            EM: `Create roles successfully: ${persists.length} roles!`,
            EC: 0,
            DT: []
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

const getAllRoles = async () => {
    try {
        
        let data = await db.Role.findAll({
            where: { deleted: false },
            order: [['id', 'DESC']]
        });
    
        return {
            EM: `Get all roles successfully`,
            EC: 0,
            DT: data
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

const getRoleWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;

        const { count, rows } = await db.Role.findAndCountAll({
            where: { deleted: false },
            order: [
                ['id', 'DESC']
            ],
            offset: offset,
            limit: limit,
        })

        let data = {
            totalRows: count,
            totalPages: Math.ceil(count / limit),
            roles: rows
        }

        return {
            EM: "Get role with pagination successfully!",
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

const deleteRole = async (data) => {
    try {
        let role = await db.Role.findOne({
            where: {
                id: data.id
            }
        })
        
        if (role) {
            // update
            await role.update({
                url: data.url,
                description: data.description,
                deleted: true,
                deletedAt: new Date()
            });

            return {
                EM: "Delete role successfully!",
                EC: 0,
                DT: ''
            }

        } else {
            // not found
            return {
                EM: "Role not found!",
                EC: 1,
                DT: ""
            }
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

const updateRole = async (data) => {
    try {
        if(!data.url){
            return {
                EM: "Url is required!",
                EC: 1,
                DT: "url"
            }
        }

        let role = await db.Role.findOne({
            where: {
                id: data.id
            }
        })
        
        if (role) {
            // update
            await role.update({
                url: data.url,
                description: data.description,
            });

            return {
                EM: "Update role successfully!",
                EC: 0,
                DT: ''
            }

        } else {
            // not found
            return {
                EM: "Role not found!",
                EC: 1,
                DT: ""
            }
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

const getRoleByGroup = async (id) => {
    try {
        if(!id) {
            return {
                EM: "Not found any roles!",
                EC: 1,
                DT: []
            }
        }
        
        let roles = await db.Group.findOne({
            where: {
                id: id
            },
            attributes: ['id', 'name', 'description'],
            include: [
                {
                    model: db.Role,
                    where: { deleted: false },
                    attributes: ['id', 'url', 'description'],
                    through: { attributes: [] },
                    required: false
                }
            ]
        })
    
        return {
            EM: `Get roles by group successfully`,
            EC: 0,
            DT: roles
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

module.exports = {
    createRoles,
    getAllRoles,
    deleteRole,
    getRoleWithPagination,
    updateRole,
    getRoleByGroup
}