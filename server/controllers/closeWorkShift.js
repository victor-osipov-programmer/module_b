const pool = require('../api/db.js')
const { dateToString } = require('../utils/date.js')
const { validationError, forbiddenForYou } = require('../api/errors.js')

module.exports = async function(req, res) {
    if (req.user?.group_name != "Admin") return forbiddenForYou(res);

    const [[work_shift]] = await pool.execute(`SELECT * FROM work_shifts WHERE work_shift_id = ?`,
    [req.params.id]);

    if (!work_shift) {
        return validationError(res, {
            work_shift_id: ['there is no work shift with such a work_shift_id']
        })
    }

    if (!work_shift.active) {
        return res.status(403).json({
            "error": {
                "code": 403,
                "message": "Forbidden. The shift is already closed!"
            }
        })
    }

    const [response] = await pool.execute(`UPDATE work_shifts SET active = ? WHERE work_shift_id = ?`,
    [0, req.params.id]);

    res.json({
        "data": {
            "id": req.params.id,
            "start": dateToString(new Date(work_shift.start)),
            "end": dateToString(new Date(work_shift.end)),
            "active": false
        }
    })
}