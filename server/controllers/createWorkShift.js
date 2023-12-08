const pool = require('../api/db.js');
const { dateToString } = require('../utils/date.js');
const { forbiddenForYou } = require('../api/errors.js');

module.exports = async function(req, res) {
    if (req.user?.group_name != "Admin") return forbiddenForYou(res);

    const {start, end} = req.body;
    const startDate = new Date(start);
    const endDate = new Date(end);

    const errors = {};

    if (startDate < new Date()) 
        errors.start_date_time = [`the date and time of the start of the shift should not be earlier than the current date and time`];
    if (startDate > endDate) 
        errors.end_date_time = [`the date and time of the end of the shift should not be earlier than the date and time of the start of the shift`];
    if (!start) 
        errors.start_date_time = [`field start cannot be blank`];
    if (!end) 
        errors.start_date_time = [`field end cannot be blank`];

    if (Object.keys(errors).length != 0) {
        return res.status(422).json({
            error: {
                code: 422,
                message: 'Validation error',
                errors
            }
        })
    }

    const [response] = await pool.execute(`INSERT INTO work_shifts(start, end) VALUES (?, ?)`,
    [startDate, endDate]);

    res.status(200).json({
        "data": {
            "id": response.insertId,
            "start": dateToString(startDate),
            "end": dateToString(endDate),
        }
    }); 
}