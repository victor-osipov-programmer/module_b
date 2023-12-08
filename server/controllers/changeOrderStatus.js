const pool = require('../api/db.js');
const { forbiddenForYou, validationError } = require('../api/errors.js');
const consts = require('../api/consts.js');

module.exports = async function(req, res) {
    if (req.user?.group_name != "Waiter" && req.user?.group_name != "Cook") return forbiddenForYou(res);

    if (!req.body.status) {
        return validationError({
            status: ['field status cannot be blank']
        });
    }

    const [[order]] = await pool.execute(`SELECT * FROM orders WHERE order_id = ?`,
    [req.params.id]);

    if (req.user?.group_name == "Waiter" && order.user_id != req.user.user_id) {
        return res.status(403).json({
            "error": {
                "code": 403,
                "message": "Forbidden! You did not accept this order!"
            }
        })
    }

    const [[work_shift]] = await pool.execute(`SELECT * FROM work_shifts WHERE work_shift_id = ?`,
    [order.work_shift_id]);
    
    if (!work_shift.active) {
        return res.status(403).json({
            "error": {
                "code": 403,
                "message": "You cannot change the order status of a closed shift!"
            }
        })
    }

    const old_status = consts.order_statuses.find(el => el.order_status_id == order.order_status_id).name;
    const new_status = req.body.status;
    
    function CantChangeExistingOrderStatus(res) {
        res.status(403).json({
            "error": {
                "code": 403,
                "message": "Forbidden! Can't change existing order status"
            }
        })
    }

    if (req.user.group_name == "Waiter") {

        if (!(
            old_status == 'accepted' && new_status == 'canceled' ||
            old_status == 'ready' && new_status == 'paid-up'
            )) 
        return CantChangeExistingOrderStatus(res);

    } else if (req.user.group_name == "Cook") {

        if (!(
            old_status == 'accepted' && new_status == 'preparing' ||
            old_status == 'preparing' && new_status == 'ready'
            )) 
        return CantChangeExistingOrderStatus(res);

    }
    
    const order_status_id = consts.order_statuses.find(el => el.name == new_status).order_status_id;
    const [response] = await pool.execute(`UPDATE orders SET order_status_id = ? WHERE order_id = ?`,
    [order_status_id, req.params.id]);

    res.json({
        "data": {
            "id": req.params.id,
            "status": new_status
        }
    })
}