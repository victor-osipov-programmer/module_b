const pool = require('../api/db.js')
const { validationError, forbiddenForYou } = require('../api/errors.js');

module.exports = async function(req, res) {
    if (req.user?.group_name != "Waiter") return forbiddenForYou(res);

    const [[work_shift]] = await pool.execute(`SELECT * FROM work_shifts WHERE work_shift_id = ?`,
    [req.body.work_shift_id]);

    if (!work_shift) {
        return validationError(res, {
            work_shift_id: ['there is no work shift with such a work_shift_id']
        });
    }
    if (!work_shift.active) {
        return res.status(403).json({
            "error": {
            "code": 403,
                "message": "Forbidden. The shift must be active!"
            }
        })
    }

    const [[waiter]] = await pool.execute(`SELECT * FROM employees_at_work_shift WHERE work_shift_id = ? AND user_id = ?`,
    [req.body.work_shift_id, req.user.user_id]);

    if (!waiter) {
        return res.status(403).json({
            "error": {
            "code": 403,
                "message": "Forbidden. You don't work this shift!"
            }
        })
    }

    const date = new Date();

    const [response] = await pool.execute(`INSERT INTO orders(work_shift_id, table_id, user_id, create_at) VALUES (?, ?, ?, ?)`,
    [req.body.work_shift_id, req.body.table_id, req.user.user_id, date]);
    const [[user]] = await pool.execute(`SELECT name FROM users WHERE user_id = ?`,
    [req.user.user_id]);

    res.json({
        "data": {
            "id": response.insertId,
            "table": "Столик №" + req.body.table_id,
            "shift_workers": user.name,
            "create_at": date,
            "status": "Принят",
            "price": 0
        }
    });
}