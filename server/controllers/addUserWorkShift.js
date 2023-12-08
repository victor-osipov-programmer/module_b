const pool = require('../api/db.js');
const { forbiddenForYou } = require('../api/errors.js');

module.exports = async function(req, res) {
    if (req.user?.group_name != "Admin") return forbiddenForYou(res);

    const [duplicates] = await pool.execute(`SELECT * FROM employees_at_work_shift WHERE work_shift_id = ? AND user_id = ?`,
    [req.params.id, req.body.user_id]);

    if (duplicates.length != 0) {
        return res.status(403).json({
            "error": {
                "code": 403,
                "message": "Forbidden. The worker is already on shift!"
            }
        })
    }

    const [employees] = await pool.execute(`SELECT * FROM employees_at_work_shift WHERE work_shift_id = ?`,
    [req.params.id]);
    const employee_number = employees.length + 1;

    const [response] = await pool.execute(`INSERT INTO employees_at_work_shift(work_shift_id, user_id, id_user) VALUES (?, ?, ?)`,
    [req.params.id, req.body.user_id, employee_number]);

    res.json({
        "data": {
            "id_user": employee_number,
            "status": "added"
        }
    });
}