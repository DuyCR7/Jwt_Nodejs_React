import apiService from '../service/ApiService';

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

module.exports = {
    handleRegister,
}