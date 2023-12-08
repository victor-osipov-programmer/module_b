function authenticationFailed(res) {
    res.status(401).json({
        error: {
            code: 401,
            message: 'Authentication failed'
        }
    });
}

function loginFailed(res) {
    res.status(403).json({
        error: {
            code: 403,
            message: 'Login failed'
        }
    });
}

function forbiddenForYou(res) {
    res.status(403).json({
        error: {
            code: 403,
            message: 'Forbidden for you'
        }
    });
}

function validationError(res, errors) {
    res.status(422).json({
        error: {
            code: 422,
            message: 'Validation error',
            errors
        }
    });
}

module.exports = {
    authenticationFailed,
    loginFailed,
    forbiddenForYou,
    validationError
}