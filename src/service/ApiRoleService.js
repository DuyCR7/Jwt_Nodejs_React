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

module.exports = {
    createRoles,
}