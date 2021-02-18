const User = require("../models/userModel");
module.exports = function (role) {
	//role is an array of role codes against which you want to check the user
	return async function (req, res, next) {
		try {
			const email = req.user.email;
			const user = await User.findOne({ email });
			if (user.role.includes(role)) {
				next();
			} else {
				res
					.status(200)
					.json({
						success: false,
						message: "PERMISSION ERROR",
						error: {
							status: 403,
							message: "You dont have permission to perform this task",
						},
					});
			}
		} catch (err) {
			console.log(err);
			res
				.status(200)
				.send({
					success: false,
					status: 500,
					message: "Internel Server error, please try again after some time",
				});
		}
	};
};
