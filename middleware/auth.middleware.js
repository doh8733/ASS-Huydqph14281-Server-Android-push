exports.RequestLogin = (req, res, next) => {
    if (req.session.user) {
         next();
    }
    else {
         res.redirect('/users/login');
    }

};

exports.IsLogin = (req, res, next) => {
    if (!req.session.user) {
         next();

    }
    else {
        res.redirect('/users');
    }

};