exports.signin_validator = (request, response, next) => {
    request
        .check('email', 'Email must be between 4 to 32 characters')
        .matches(
            /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        )
        .withMessage('Please type your valid email id')
        .isLength({
            min: 4,
            max: 32
        });
    request.check('password', 'Invalid Social Login Token!').notEmpty();
    request
        .check('password')
        .isLength({ min: 8 })
        .withMessage('Your social login token is invalid!');
    const sign_in_errors = request.validationErrors();
    if (sign_in_errors) {
        const firstError = sign_in_errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};

exports.signup_validator = (req, res, next) => {
    req.check('name', 'Name is required').notEmpty();
    req.check('email', 'Email must be between 4 to 32 characters')
        .matches(/.+\@.+\..+/)
        .withMessage('Email must contain @')
        .isLength({
            min: 4,
            max: 32
        });
    req.check('password', 'Password is required').notEmpty();
    req.check('password')
        .isLength({ min: 8 })
        .withMessage('Password must contain at least 8 characters')
        .matches(/\d/)
        .withMessage('Password must contain a number');
    const signup_errors = req.validationErrors();
    if (signup_errors) {
        const firstError = signup_errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};

exports.create_post_validator = (req, res, next) => {
    req.check('title', 'Write a title').notEmpty();
    req.check('title', 'Title must be between 4 to 150 characters').isLength({
        min: 4,
        max: 150
    });
    req.check('body', 'Write a body').notEmpty();
    req.check('body', 'Body must be between 4 to 2000 characters').isLength({
        min: 4,
        max: 2000
    });
    const create_post_errors = req.validationErrors();
    if (create_post_errors) {
        const firstError = create_post_errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};

exports.password_reset_validator = (req, res, next) => {
    req.check('newPassword', 'Password is required').notEmpty();
    req.check('newPassword')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')

    const pass_reset_errors = req.validationErrors();
    if (pass_reset_errors) {
        const firstError = pass_reset_errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};
