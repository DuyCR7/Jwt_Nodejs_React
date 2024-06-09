import express from 'express';

// express app
const configViewEngine = (app) => {
    app.use(express.static('../public'));
    app.set('view engine', 'ejs');
    app.set('views', '../views');
}

export default configViewEngine;