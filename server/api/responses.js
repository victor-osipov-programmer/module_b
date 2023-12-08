function logout(res) {
    res.status(200).json({
        "data": {
            "message": "logout"
        }
    });
}

module.exports = {
    logout
}