const pool = require('../api/db.js')
const { randomString } = require('../utils/random.js')
const { authenticationFailed } = require('../api/errors.js')
const UserTokens = require('../api/UserTokens.js')

module.exports = async function(req, res) {
    const {login, password} = req.body;

    if (!login || !password) {
        return authenticationFailed(res);
    }

    const [[user]] = await pool.execute('SELECT * FROM users WHERE login = ? AND password = ?', [login, password]);

    if (!user) {
        return authenticationFailed(res);
    }

    const user_token = randomString(70);
    res.json({user_token});

    UserTokens.add(user_token, user.user_id, user.group_id);
}