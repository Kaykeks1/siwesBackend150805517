/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcrypt');

module.exports = {
	// 'new': function(req, res){
	// 	res.view('session/new');
	// },

	create: function(req, res, next) {

		User.findOneByEmail(req.param('email'), function foundUser(err, user){
			if (err) return next(err);

			if (user) {
				bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, valid){
                    if (err) return next(err);
    
                    if (valid) {
                        req.session.authenticated = true;
                        req.session.User = user;
                        user.online = true;
                        // res.redirect('/user/show/' + user.id);
                        res.json(user);
                    }
                });
            }
		});
	},

	destroy: function(req, res, next) {

		User.fineOne(req.session.User.id, function foundUser(err, user){
			var userId = req.session.User.id;

			User.update(userId, {

				online: false
			}, function (err) {
				if (err) return next(err);

				req.session.destroy();
				// res.redirect('/session/new');
			});
		});
	}
};

