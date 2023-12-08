const pool = require('../api/db.js')
const consts = require('../api/consts.js')
const { forbiddenForYou, loginFailed } = require('../api/errors.js')
const { getFileName } = require('../utils/string.js')
const { changeKeyName } = require('../utils/obj.js')
var insert = require('sql-bricks').insert;

module.exports = async function(req, res) {
    if (req.user?.group_name != "Admin") return forbiddenForYou(res);

    changeKeyName(req.body, 'role_id', 'group_id');
    req.body.photo_file = getFileName(req.files.photo_file.path);

    const sql = insert('users', req.body).toString();
    let response;
    try {
        [response] = await pool.execute(sql);
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(422).json({
                error: {
                    code: 422,
                    message: 'Validation error',
                    errors: {
                        login: [ 'the nickname is already taken' ]
                    }
                }
            })
        } else {
            throw err;
        }
    }

    res.status(200).json({
        "data": {
            "id": response.insertId,
            "status": "created"
        }
    }); 
}