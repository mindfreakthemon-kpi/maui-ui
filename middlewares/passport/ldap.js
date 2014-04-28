module.exports = function (app) {
	var passport = require('passport'),
		LdapStrategy;

	try {
		LdapStrategy = require('passport-ldapauth').Strategy;
	} catch (e) {
		return;
	}

	passport.use(new LdapStrategy({
			server: {
				url: 'ldap://127.0.0.1:389/',
				adminDn: 'CN=test,CN=test,DC=example.com',
				adminPassword: 'test',
				searchBase: 'CN=test,DC=example.com',
				searchFilter: '(cn={{username}})'
			},
			passReqToCallback: true
		},
		function (req, user, done) {
			var User = app.get('models:User');

			User.auth(req, 'ldap', user.distinguishedName, {
				name: user.userPrincipalName
			}, done);
		}
	));
};
