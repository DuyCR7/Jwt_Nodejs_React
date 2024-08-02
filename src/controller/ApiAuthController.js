import apiService from '../service/ApiAuthService';
import { createNewAccessToken } from "../middlewares/JWTAction";

// 0: thành công
// 1: validation
// -1: lỗi

const handleRegister = async (req, res) => {
    try {
        // req.body: email, phone, password, username
        if(!req.body.email || !req.body.phone || !req.body.password){
            return res.status(200).json({
                EM: 'Missing required parameters!',   // error message
                EC: 1,   // error code
                DT: '',   // data
            })
        }

        if(req.body.password && req.body.password.length <= 3){
            return res.status(200).json({
                EM: 'Password must have more than 3 letters!',   // error message
                EC: 1,   // error code
                DT: '',   // data
            })
        }

        // service: create user account
        let data = await apiService.registerNewUser(req.body);

        return res.status(200).json({
            EM: data.EM,   // error message
            EC: data.EC,   // error code
            DT: '',   // data
        });

    } catch (e) {
        return res.status(500).json({
            EM: 'Error form server!',   // error message
            EC: -1,   // error code
            DT: '',   // data
        })
    }
}

const handleLogin = async (req, res) => {
    try {
        let data = await apiService.loginUser(req.body);

        // set cookie
        // thuộc tính httpOnly giúp nâng cao bảo mật cookie, phía client không lấy được
        if(data && data.DT && data.DT.access_token){
            res.cookie("jwt", data.DT.access_token, { httpOnly: true, maxAge: 10000, samesite: 'strict' });
            res.cookie("refresh_token", data.DT.refresh_token, { httpOnly: true, maxAge: 365 * 24 * 60 * 60 * 1000, samesite: 'strict' });
        }

        const { refresh_token, ...newData } = data.DT;

        return res.status(200).json({
            EM: data.EM,   // error message
            EC: data.EC,   // error code
            DT: newData,   // data
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'Error form server!',   // error message
            EC: -1,   // error code
            DT: '',   // data
        })
    }
}

const handleLogout = async (req, res) => {
    try {
        
        res.clearCookie("jwt");
        res.clearCookie("refresh_token");

        return res.status(200).json({
            EM: 'Đăng xuất thành công!',   // error message
            EC: 0,   // error code
            DT: '',   // data
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'Lỗi, vui lòng thử lại sau!',   // error message
            EC: -1,   // error code
            DT: '',   // data
        })
    }
}

const handleRefreshToken = async (req, res) => {
    try {
        // console.log("req.cookies: ", req.cookies.refresh_token);

        const token = req.cookies.refresh_token;
        if(!token){
            return res.status(401).json({
                EM: 'Error!',   // error message
                EC: -1,   // error code
                DT: '',   // data
            })
        }

        let data = await createNewAccessToken(token);
        res.cookie("jwt", data.DT, { httpOnly: true, maxAge: 10000, samesite: 'strict' });

        return res.status(200).json({
            EM: data.EM,   // error message
            EC: data.EC,   // error code
            DT: data.DT,   // data
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'Error form server!',   // error message
            EC: -1,   // error code
            DT: '',   // data
        })
    }
}

module.exports = {
    handleRegister,
    handleLogin,
    handleLogout,
    handleRefreshToken
}