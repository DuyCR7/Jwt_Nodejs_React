import db from "../models/index";
import bcrypt from "bcryptjs";

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
    });

    return {
      EM: "Create user account successfully!",
      EC: 0,
    };

  } catch (e) {
    console.log(e);
    return {
        EM: 'Something went wrongs!',
        EC: -1
    }
  }
};

module.exports = {
  registerNewUser,
};
