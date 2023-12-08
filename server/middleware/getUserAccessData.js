const consts = require('../api/consts.js')
const UserTokens = require('../api/UserTokens.js')

module.exports = async function(req, res, next) {
    req.token = req.get('Authorization')?.split(' ')[1];
    const token_data = await UserTokens.get(req.token);
    
    if (token_data) {
        req.user = {
            user_id: token_data.user_id,
            group_name: consts.groups.find((el) => el.group_id == token_data.group_id).name,
            group_ru_name: consts.groups.find((el) => el.group_id == token_data.group_id).ru_name
        }
    }

    next();
}