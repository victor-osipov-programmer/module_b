const express = require('express');
const router = express.Router();
const getUsersController = require('../controllers/getUsers')
const createUserController = require('../controllers/createUser')
const formidableMiddleware = require('express-formidable');

router.get('/user', getUsersController);
router.post('/user', createUserController);

module.exports = router;