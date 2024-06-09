import userService from '../service/UserService';

const handleGetUsers = (req, res) => {
    return res.render('user.ejs');
}

const handleStoreNewUser = (req, res) => {
    // return res.json(req.body);
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    userService.createNewUser(email, password, username);

    return res.send('Create user successfully!');
}

module.exports = {
    handleGetUsers,
    handleStoreNewUser
}