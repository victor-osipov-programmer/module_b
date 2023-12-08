const pool = require('../api/db.js');
const { forbiddenForYou } = require('../api/errors.js');
const { OrderStatuses } = require('../api/Consts2.js');

module.exports = async function(req, res) {
    if (req.user?.group_name != "Cook") return forbiddenForYou(res);
    
    const [[work_shift]] = await pool.execute(`SELECT * FROM work_shifts WHERE active = 1`);
    let [orders] = await pool.execute(`
    SELECT orders.order_id as id, CONCAT('Столик №', orders.table_id) as 'table', users.name as shift_workers, orders.create_at, orders.order_status_id, orders.price 
    FROM orders
    INNER JOIN users ON orders.user_id = users.user_id
    WHERE work_shift_id = ? AND order_status_id IN (?, ?)`,
    [work_shift.work_shift_id, OrderStatuses.get('ru_name', 'Принят').id, OrderStatuses.get('ru_name', 'Готовится').id]);

    orders = orders.map(el => {
        return {
            "id": el.id,
            "table": el.table,
            "shift_workers": el.shift_workers,
            "create_at": el.create_at,
            "status": OrderStatuses.get('id', el.order_status_id).ru_name,
            "price": el.price
        }
    })

    res.json({
        data: orders
    });
}