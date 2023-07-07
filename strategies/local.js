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
		done(null, user);
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
				new Error('Something went wrong');
			}
			try {
				const user = await userRepository.getUserByEmail(email);
				if (!user) {
					new Error('Something went wrong');
				}
				const isValid = await bcrypt.compare(
					password,
					user.dataValues.password
				);
				if (isValid) {
					done(null, user.dataValues);
				} else {
					done(null, false);
				}
			} catch (err) {
				done(err, null);
			}
		}
	)
);
