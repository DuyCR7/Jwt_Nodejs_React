require("dotenv").config();
import db from "../models/index";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";
import { getGroupWithRoles } from "./JWTService";
import { createJWT } from "../middlewares/JWTAction"

const salt = bcrypt.genSaltSync(10);

// api register

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

const registerNewUser = async (rawUserData) => {
  try {
    // check email/phone number are exists
    let isEmailExists = await checkEmailExists(rawUserData.email);
    if (isEmailExists === true) {
      return {
        EM: "Email is already exists!",
        EC: 1,
      };
    }
    let isPhoneExists = await checkPhoneExists(rawUserData.phone);
    if (isPhoneExists === true) {
      return {
        EM: "Phone number is already exists!",
        EC: 1,
      };
    }

    // hash user password
    let hashPassword = hashUserPassword(rawUserData.password);

    // create new user
    await db.User.create({
      email: rawUserData.email,
      password: hashPassword,
      username: rawUserData.username,
      phone: rawUserData.phone,
      groupId: 5
    });

    return {
      EM: "Create user account successfully!",
      EC: 0,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "Something went wrongs!",
      EC: -1,
    };
  }
};

// api login

const checkPassword = (inputPassword, hashPassword) => {
  return bcrypt.compareSync(inputPassword, hashPassword); // true or false
};

const loginUser = async (rawUserData) => {
  try {
    let user = await db.User.findOne({
      where: {
        [Op.or]: [
          { email: rawUserData.valueLogin },
          { phone: rawUserData.valueLogin },
        ],
      },
    });

    // console.log("Check user js object: ", user.get({ plain: true}));
    // console.log("Check user sequelize object: ", user);
    if (user) {
      let isPasswordCorrect = checkPassword(
        rawUserData.password,
        user.password
      );
      if (isPasswordCorrect) {

        // test roles
        let groupWithRoles = await getGroupWithRoles(user);
        let payload = {
          email: user.email,
          username: user.username,
          groupWithRoles,
          expiresIn: process.env.JWT_EXPIRES_IN,
        }

        // let token
        let token = createJWT(payload);

        return {
          EM: "Login successfully!",
          EC: 0,
          DT: {
            access_token: token,
            groupWithRoles,
            email: user.email,
            username: user.username
          },
        };
      }
    }

    return {
      EM: "Your email/phone number or password is incorrect!",
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
};

module.exports = {
  registerNewUser,
  loginUser,
};
