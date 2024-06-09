// Get the client
import mysql from 'mysql2';
import bcrypt from 'bcryptjs';

// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
  });

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = (email, password, username) => {
    let hashPass = hashUserPassword(password);

    var sql = 'INSERT INTO users (email, password, username) VALUES (?, ?, ?)';
    var values = [email, hashPass, username];

    connection.execute(sql, values, (err, result, fields) => {
        if (err instanceof Error) {
          console.log(err);
          return;
        }
      });
}

module.exports = {
    createNewUser
}