import jwt from 'jsonwebtoken';
require("dotenv").config();

// tạo token
const createJWT = () => {
    let payload = {
        id: 1,
        email: 'test',
        name: 'test'
    };
    let key = process.env.JWT_SECRET;
    let token = null;

    try {
        token = jwt.sign(payload, key);
        console.log(token);
    } catch (err) {
        console.log(err);
    }

    return token;
}

// giải mã
const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let data = null;

    try {
        let decoded = jwt.verify(token, key);
        data = decoded;
    } catch (err) {
        console.log(err);
    }
    return data;
}

module.exports = {
    createJWT,
    verifyToken,
}