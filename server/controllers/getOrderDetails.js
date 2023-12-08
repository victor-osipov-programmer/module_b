const pool = require('../api/db.js')
const { validationError, forbiddenForYou } = require('../api/errors.js');
const { changeKeyName } = require('../utils/obj.js');
const consts = require('../api/consts.js')

module.exports = async function(req, res) {
    if (req.user?.group_name != "Waiter") return forbiddenForYou(res);

    let [[order]] = await pool.execute(`
    SELECT orders.user_id, orders.order_id as id, CONCAT('Столик №', orders.table_id) as 'table', users.name as shift_workers, orders.create_at, orders.order_status_id, orders.price 
    FROM orders 
    INNER JOIN users ON orders.user_id = users.user_id
    WHERE order_id = ?`,
    [req.params.id]);

    if (order.user_id != req.user.user_id) {
        return res.status(403).json({
            "error": {
                "code": 403,
                "message": "Forbidden. You did not accept this order!"
            }
        })
    }

    let [positions] = await pool.execute(`SELECT * FROM positions WHERE order_id = ?`,
    [req.params.id]);

    let sum = 0;
    positions = positions.map(el => {
        sum += el.price;

        return {
            id: el.position_id,
            count: el.count,
            position: el.position,
            price: el.price,
        };
    })

    res.json({
        "data": {
            "id": order.id,
            "table": order.table,
            "shift_workers": order.shift_workers,
            "create_at": order.create_at,
            "status": consts.order_statuses.find(el => el.order_status_id == order.order_status_id).ru_name,
            "positions": positions,
            "price_all": sum
        }
    })
}