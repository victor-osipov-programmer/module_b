const pool = require('./db.js')

module.exports = class UserTokens {
    static #tokens = [];

    static async update() {
        const [user_tokens] = await pool.execute(`SELECT * FROM user_tokens`);
        this.#tokens = user_tokens;
    }

    static async updateWithCondition() {
        if (this.#tokens.length == 0) await this.update();
    }

    static async add(user_token, user_id, group_id) {
        await this.updateWithCondition();

        this.#tokens = this.#tokens.filter((el) => el.user_id != user_id);
        const date = new Date()

        pool.execute(`INSERT INTO user_tokens(user_token, user_id, group_id) VALUES (?, ?, ?)`, 
        [user_token, user_id, group_id])
        .catch((err) => {
            if (err.message.startsWith('Duplicate')) {
                pool.execute(`UPDATE user_tokens SET user_token = ?, created_at = ? WHERE user_id = ?`, [user_token, date, user_id]);
            }
        });
        this.#tokens.push({user_token, user_id, group_id, create_at: date});
    }
    
    static async remove(user_token) {
        await this.updateWithCondition()

        this.#tokens = this.#tokens.filter((el) => el.user_token != user_token);
        const response = await pool.execute(`DELETE FROM user_tokens WHERE user_token = ?`, [user_token]);
        return response[0].affectedRows > 0 ? true : false;
    }

    static async get(user_token) {
        await this.updateWithCondition()
        
        return this.#tokens.find((el) => el.user_token == user_token);
    }

    static log() {
        console.log(this.#tokens);
    }
}