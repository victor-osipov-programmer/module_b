const pool = require('../api/db.js')
const UserTokens = require('../api/UserTokens.js')
const { logout } = require('../api/responses.js')

module.exports = async function(req, res) {
    logout(res);

    UserTokens.remove(req.token);
}