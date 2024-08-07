import db from "../models/index";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const checkEmailExists = async (email) => {
    let user = await db.User.findOne({
      where: {
        email: email,
      },
    });
  
    if (user) {
      return true;
    } else {
      return false;
    }
  };
  
  const checkPhoneExists = async (phone) => {
    let user = await db.User.findOne({
      where: {
        phone: phone,
      },
    });
  
    if (user) {
      return true;
    } else {
      return false;
    }
  };

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const getAllUsers = async () => {
    try {
        let users = await db.User.findAll({
            order: [
                ['id', 'DESC']
            ],
            attributes: ['id', 'email', 'username', 'phone', 'sex', 'address', 'image'],
            include: {model: db.Group, attributes: ['id', 'name', 'description']}
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

const getUserWithPagination = async (page, limit, search, sortConfig) => {
    try {
        let offset = (page - 1) * limit;
        let order = [[sortConfig.key, sortConfig.direction]];

        const whereClause = {
            [Op.or]: [
                { email: { [Op.like]: `%${search}%` } },
                // { username: { [Op.like]: `%${search}%` } },
                // Add more fields here for searching
            ]
        }

        const { count, rows } = await db.User.findAndCountAll({
            where: whereClause,
            order: order,
            offset: offset,
            limit: limit,
            attributes: ['id', 'email', 'username', 'phone', 'sex', 'address', 'image'],
            include: {model: db.Group, attributes: ['id', 'name', 'description']}
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

const createUser = async (dataUser) => {
    try {
        // check email/phone number are exists
        let isEmailExists = await checkEmailExists(dataUser.email);
        if (isEmailExists === true) {
          return {
            EM: "Email is already exists!",
            EC: 1,
            DT: "email"
          };
        }

        if(!validateEmail(dataUser.email)) {
            return {
                EM: "Email is not valid!",
                EC: 1,
                DT: "email"
            };
        }

        let isPhoneExists = await checkPhoneExists(dataUser.phone);
        if (isPhoneExists === true) {
          return {
            EM: "Phone number is already exists!",
            EC: 1,
            DT: "phone"
          };
        }

        if (dataUser.password.length <= 3) {
            return {
                EM: "Password must have more than 3 letters!",   // error message
                EC: 1,   // error code
                DT: "password",   // data
            }
        }

        // hash user password
        let hashPassword = hashUserPassword(dataUser.password);

        await db.User.create({...dataUser, password: hashPassword});

        return {
            EM: "Create new user successfully!",
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

const updateUser = async (data) => {
    try {
        if(!data.groupId){
            return {
                EM: "Group is required!",
                EC: 1,
                DT: "groupId"
            }
        }

        let user = await db.User.findOne({
            where: {
                id: data.id
            }
        })
        
        if (user) {
            // update
            await user.update({
                username: data.username,
                address: data.address,
                sex: data.sex,
                groupId: data.groupId,
                image: data.image
            });

            return {
                EM: "Update user successfully!",
                EC: 0,
                DT: user
            }

        } else {
            // not found
            return {
                EM: "User not found!",
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

const deleteUser = async (id) => {
    try {
        await db.User.destroy({
            where: {
                id: id
            }
        })

        return {
            EM: "Delete user successfully!",
            EC: 0,
            DT: ''
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

const getUserById = async (id) => {
    try {
      let user = await db.User.findOne({
        where: {
          id: id
        },
        attributes: ['id', 'email', 'username', 'phone','sex', 'address', 'image']
      });
  
      if (user) {
        return {
          EM: "Get User By Id Successfully!",
          EC: 0,
          DT: user,
        };
      }
  
      return {
        EM: "Not found user!",
        EC: 1,
        DT: "",
      };
  
    } catch (e) {
      console.log(e);
      return {
        EM: "Something went wrongs!",
        EC: -1,
      };
    }
  }

module.exports = {
    getAllUsers,
    getUserWithPagination,
    createUser,
    updateUser,
    deleteUser,
    getUserById
}