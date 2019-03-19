/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcrypt');

module.exports = {
	signup: async (req, res) => {
        const data = req.body;
        data.online = true;
        await User.findOneByEmail(data.email, function foundUser(err, user){
            if (user){
                return res.send({message: "Email already exist"})
            }
            User.create(data, function(err, user){
                if (err) {
                    console.log(err);
                    return res.send({message: "Cannot signup"})
                }
                // req.
                // req.session.authenticated = true;
                // req.session.User = user;
                if(user) {
                    user.online = true;
                    res.send({ ...user, authenticated: true });
                }else {
                    console.log('dont know');
                    return res.send({message: "Cannot signup"})
                }
            })
        })
    },

    login: function(req, res, next) {

		User.findOneByEmail(req.param('email'), function foundUser(err, user){
            if (err) return next(err);
            
            User.update(User.id, {
                    
                online: true
            }, function (err) {
                if (err) {
                    console.log('2');
                }
            });

			if (user) {
				bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, valid){
                    if (err) return next(err);
    
                    if (valid) {
                        // console.log(req.session);
                        // var d = new Date();
                        // var dd = new Date(d.getTime() + 360000)
                        // req.session.cookie.expires = dd;
                        // req.session.authenticated = true;
                        // req.session.User = user;
                        user.online = true; 
                        console.log(req.session);
                        res.send({ ...user, authenticated: true });
                        console.log(req.session);
                        // res.redirect('/user/show/' + user.id);
                        // res.json(user);
                    }
                    else {
                        res.send({message: "Account does not exist"})
                    }
                });
            }
            else {
                res.send({message: "Account does not exist"})
            }
		});
	},

	logout: function(req, res, next) {
        var id = req.body.user;
        // console.log(req.session);

		User.findOne(id, function foundUser(err, user){
            // var userId = req.session.User.id;
            var userId = id;
            console.log('1');
            if (user) {

                User.update(userId, {
                    
                    online: false
                }, function (err) {
                    if (err) {
                        console.log('2');
                        return res.send({ id: userId, status: false, message: "logout failed" });
                    }
                    // console.log(req.session);
                    // req.session.destroy();
                    // console.log(req.session);
                    // console.log('3');
                    // console.log(req.session);
                    // res.json(userId);
                    res.send({ id: userId, status: true, message: "logout successful" });
                    // res.redirect('/session/new');
                });
            }
            else {
                res.send({ id: userId, status: false, message: "logout failed" })
            }
		});
	},

    read: async (req, res) => {
        await User.findOne(req.param('id'), function(err, user){
            if (err) {
                return next(err);
            }
            if (!user) {
                return next();
            }
            req.session.authenticated = true;
            req.session.User = user;
            user.online = true;
            res.json(user);//res.send
        })
    },

    edit: async (req, res) => {
        User.update(req.param('id'), req.params.all(), function(err, user){
            if (err) {
                return next(err);
            }
            res.json(user);
        })
    }
};

