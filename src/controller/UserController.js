import userService from '../service/UserService';

const handleGetUsers = async (req, res) => {
    let userList = await userService.getUsersList();

    return res.render('user.ejs', { userList: userList });
}

const handleStoreNewUser = async (req, res) => {
    // return res.json(req.body);
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    await userService.createNewUser(email, password, username);

    return res.redirect('/users');
}

const handleDeleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id);

    return res.redirect('/users');
}

const getEditUserPage = async (req, res) => {
    let id = req.params.id;

    let user = await userService.getUserById(id);
    
    let userEdit = {};
    userEdit = user;

    return res.render('user-edit.ejs', { userEdit: userEdit });
}

const handleUpdateUser = async (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let id = req.body.id;

    await userService.updateUser(email, username, id);

    return res.redirect('/users');
}

module.exports = {
    handleGetUsers,
    handleStoreNewUser,
    handleDeleteUser,
    getEditUserPage,
    handleUpdateUser
}