const pool = require('../api/db.js')
const consts = require('../api/consts.js')
const { forbiddenForYou, loginFailed } = require('../api/errors.js')

module.exports = async function(req, res) {
    if (req.user?.group_name != "Admin") return forbiddenForYou(res);

    if (!req.user) {
        return loginFailed(res);
    }
    if (req.user?.group_name != 'Admin' && req.user) {
        return forbiddenForYou(res);
    }

    const [response] = await pool.execute(`SELECT user_id, name, login, status_id, group_id FROM users`);

    const data = response.map((el) => {
        return {
            id: el.user_id,
            name: el.name,
            login: el.login,
            status: consts.statuses.find((status) => status.status_id == el.status_id).name,
            group: consts.groups.find((group) => group.group_id == el.group_id).ru_name,
        }
    })

    res.status(200).json({
        data
    });
}