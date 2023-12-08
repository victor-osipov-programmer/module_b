const express = require('express');
const router = express.Router();
const createOrderController = require('../controllers/createOrder');
const getOrderDetailsController = require('../controllers/getOrderDetails');
const changeOrderStatusController = require('../controllers/changeOrderStatus');
const getOrdersCurrentShiftController = require('../controllers/getOrdersCurrentShift');

// Cook
router.get('/order/taken', getOrdersCurrentShiftController);

// Waiter
router.post('/order', createOrderController);
router.get('/order/:id', getOrderDetailsController);

// Cook, Waiter
router.patch('/order/:id/change-status', changeOrderStatusController);

module.exports = router;