import bcrypt from 'bcryptjs';
import db from '../models/index';

// create the connection, specify bluebird as Promise

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async (email, password, username) => {
    let hashPass = hashUserPassword(password);

    try {
      await db.User.create({
        email: email,
        password:  hashPass,
        username: username,
      })
    } catch (err) {
      console.log(err);
    }
}

const getUsersList = async () => {
  let usersList = [];
  try {
    usersList = await db.User.findAll();
    return usersList;
  } catch (err) {
    console.log(err);
  }
}

const deleteUser = async (userId) => {
    try {
      await db.User.destroy({
        where: {
          id: userId,
        },
      });
    } catch (err) {
        console.log(err);
    }
}

const getUserById = async (userId) => {
  let user = {};
    try {
      user = await db.User.findOne({ 
        where: { id: userId } 
      });
      return user;
    } catch (err) {
      console.log(err);
    }
}

const updateUser = async (email, username, id) => {
    try {
        await db.User.update(
          { email: email, username: username},
          {
            where: {
              id: id,
            },
          },
        );
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    createNewUser,
    getUsersList,
    deleteUser,
    getUserById,
    updateUser
}