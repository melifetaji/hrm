const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const userRepository = require('../repositories/userRepository');

passport.serializeUser((user, done) => {
	done(null, user.eid);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await userRepository.getUserById(id);
		if (!user) throw new Error('User not found');
		delete user.dataValues.password;
		done(null, user.dataValues);
	} catch (err) {
		done(err, null);
	}
});

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
		},
		async (email, password, done) => {
			if (!email || !password) {
				return done(null, false);
			}
			try {
				const user = await userRepository.getUserByEmail(email);
				if (!user) {
					return done(null, false);
				}
				const isValid = await bcrypt.compare(password, user.password);
				if (isValid) {
					return done(null, user.dataValues);
				} else {
					return done(null, false);
				}
			} catch (err) {
				return done(err, null);
			}
		}
	)
);
