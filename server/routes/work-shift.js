const express = require('express');
const router = express.Router();
const createWorkShiftController = require('../controllers/createWorkShift');
const openWorkShiftController = require('../controllers/openWorkShift');
const closeWorkShiftController = require('../controllers/closeWorkShift');
const addUserWorkShiftController = require('../controllers/addUserWorkShift');
const getOrdersController = require('../controllers/getOrders')

// Admin
router.post('/work-shift', createWorkShiftController);
router.get('/work-shift/:id/open', openWorkShiftController);
router.get('/work-shift/:id/close', closeWorkShiftController);
router.post('/work-shift/:id/user', addUserWorkShiftController);

// Admin, Waiter
router.get('/work-shift/:id/orders', getOrdersController);

module.exports = router;