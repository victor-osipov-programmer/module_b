const pool = require('../api/db.js');
const consts = require('../api/consts.js');
const { changeKeyName } = require('../utils/obj.js');
const { dateToString } = require('../utils/date.js');
const { forbiddenForYou } = require('../api/errors.js');

module.exports = async function(req, res) {
    if (req.user?.group_name != "Admin" && req.user?.group_name != "Waiter") return forbiddenForYou(res);
    if (req.user?.group_name == "Waiter") {
        const [[employee]] = await pool.execute(`SELECT * FROM employees_at_work_shift WHERE work_shift_id = ? AND user_id = ?`,
        [req.params.id, req.user.user_id]);

        if (!employee) {
            return res.status(403).json({
                "error": {
                    "code": 403,
                    "message": "Forbidden. You did not accept this order!"
                }
            })
        }
    }

    const [[work_shift]] = await pool.execute(`SELECT * FROM work_shifts WHERE work_shift_id = ?`,
    [req.params.id]);

    let [orders] = await pool.execute(`
    SELECT orders.order_id as id, CONCAT('Столик №', orders.table_id) as 'table', users.name as shift_workers, orders.create_at, orders.order_status_id, orders.price 
    FROM orders 
    INNER JOIN users ON orders.user_id = users.user_id
    WHERE work_shift_id = ?`,
    [req.params.id]);
    
    let sum = 0;
    orders = orders.map((el) => {
        el.order_status_id = consts.order_statuses.find((obj) => obj.order_status_id == el.order_status_id).ru_name;
        changeKeyName(el, 'order_status_id', 'status');
        sum += el.price;

        return el;
    })

    res.json({
        "data": {
            "id": work_shift.work_shift_id,
            "start": dateToString(new Date(work_shift.start)),
            "end": dateToString(new Date(work_shift.end)),
            "active": work_shift.active,
            orders,
            "amount_for_all": sum
        }
    })
}