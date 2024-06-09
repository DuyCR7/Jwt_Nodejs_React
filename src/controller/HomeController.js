const handleHelloWorld = (req, res) => {
    return res.render('home.ejs');
}

module.exports = {
    handleHelloWorld,
}