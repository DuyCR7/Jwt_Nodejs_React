import express from 'express';
import path from 'path';

// express app
const configViewEngine = (app) => {
    app.use(express.static('../public'));
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '../views'));
}

export default configViewEngine;