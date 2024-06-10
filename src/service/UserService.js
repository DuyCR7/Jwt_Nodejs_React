// get the client
import mysql from 'mysql2/promise';
// get the promise implementation, we will use bluebird
import bluebird from 'bluebird';
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
      await db.User.save({
        email: email,
        password:  hashPass,
        username: username,
      })
    } catch (err) {
      console.log(err);
    }
}

const getUsersList = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
      });
    try {
        const sql = 'SELECT * FROM user';
      
        const [rows, fields] = await connection.execute(sql);
      
        return rows;
      } catch (err) {
        console.log(err);
      }
}

const deleteUser = async (id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
      });
    try {
        const sql = 'DELETE FROM user WHERE id = ? LIMIT 1';
        const values = [id];
      
        const [result, fields] = await connection.execute(sql, values);
    } catch (err) {
        console.log(err);
    }
}

const getUserById = async (id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
      });
    try {
        const sql = 'SELECT * FROM user WHERE id =?';
        const values = [id];
      
        const [rows, fields] = await connection.execute(sql, values);
      
        return rows;
      } catch (err) {
        console.log(err);
      }
}

const updateUser = async (email, username, id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
      });
    
    try {
        const sql = 'UPDATE user SET email = ?, username = ? WHERE id = ? LIMIT 1';
        const values = [email, username, id];

        const [result, fields] = await connection.execute(sql, values);
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