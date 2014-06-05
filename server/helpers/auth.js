module.exports = function (app) {
	/**
	 * Pass next() if user is logged in
	 * redirect to {@var url} otherwise
	 * @param url
	 * @returns {Function}
	 */
	app.helpers.loggedIn = function (url) {
		return function (req, res, next) {
			if (!req.user) {
				if (req.session) {
					req.session.returnTo = req.originalUrl || req.url;
				}

				res.redirect(url);
				return;
			}

			next();
		};
	};

	/**
	 * Pass next() if user is logged out
	 * redirect to {@var url} otherwise
	 * @param url
	 * @returns {Function}
	 */
	app.helpers.loggedOut = function (url) {
		return function (req, res, next) {
			if (req.user) {
				res.redirect(url);
				return;
			}

			next();
		};
	};

	/**
	 * Redirects user to returnTo session parameter
	 * or to {@var url} if none exists
	 * @param url
	 * @returns {Function}
	 */
	app.helpers.loggedTo = function (url) {
		return function (req, res) {
			if (!req.session || !req.session.returnTo) {
				res.redirect(url);
				return;
			}

			var returnTo = req.session.returnTo;
			delete req.session.returnTo;

			res.redirect(returnTo);
		};
	};

	app.helpers.isRole = function (role, url) {
		return function (req, res, next) {
			if (!req.user || req.user.role() !== role) {
				res.redirect(url);
				return;
			}

			next();
		};
	};
};
