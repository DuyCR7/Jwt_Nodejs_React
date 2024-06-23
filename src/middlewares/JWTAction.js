import jwt, { decode } from 'jsonwebtoken';
require("dotenv").config();

const nonSecurePaths = ['/', '/register', '/login']

// tạo token
const createJWT = (payload) => {
    let key = process.env.JWT_SECRET;
    let token = null;

    try {
        token = jwt.sign(payload, key);
    } catch (err) {
        console.log(err);
    }

    return token;
}

// giải mã
const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let decoded = null;

    try {
        decoded = jwt.verify(token, key);
    } catch (err) {
        console.log(err);
    }
    return decoded;
}

// middleware
const checkUserJWT = (req, res, next) => {
    if(nonSecurePaths.includes(req.path)) return next();

    let cookies = req.cookies;   // lấy cookie người dùng gửi lên
    if(cookies && cookies.jwt){
        let token = cookies.jwt;

        let decoded = verifyToken(token);
        console.log("Check: ",decoded);
        if (decoded) {
            req.user = decoded; // đính kèm thêm user vào req
            next();
        } else {
            return res.status(401).json({
                EM: 'Not authenticated!',   // error message
                EC: -1,   // error code
                DT: '',   // data
            })
        }

        // console.log("My Jwt: ", cookies.jwt);
    } else {
        return res.status(401).json({
            EM: 'Not authenticated!',   // error message
            EC: -1,   // error code
            DT: '',   // data
        })
    }
}

const checkUserPermission = (req, res, next) => {
    if(nonSecurePaths.includes(req.path)) return next();

    if(req.user){
        let email = req.user.email;
        let roles = req.user.groupWithRoles.Roles;

        console.log(req.path);

        let currentUrl = req.path;
        if(!roles || roles.length === 0){
            return res.status(403).json({
                EM: `You don't permission to access!`,   // error message
                EC: -1,   // error code
                DT: '',   // data
            })
        }

        let canAccess = roles.some((item) => item.url === currentUrl);
        if(canAccess === true) {
            next();
        } else {
            return res.status(403).json({
                EM: `You don't permission to access!`,   // error message
                EC: -1,   // error code
                DT: '',   // data
            })
        }

    } else {
        return res.status(401).json({
            EM: 'Not authenticated!',   // error message
            EC: -1,   // error code
            DT: '',   // data
        })
    }
}

module.exports = {
    createJWT,
    verifyToken,
    checkUserJWT,
    checkUserPermission
}