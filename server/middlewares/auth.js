const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/userModel");

module.exports = async function (req, res, next) {
	const authHeader = req.headers["authorization"];
	if (!authHeader) {
		return res
			.status(200)
			.json({
				success: false,
				message: "AUTH_ERROR",
				error: { status: 401, message: "This request requires auth token!" },
			});
	}
	const token = authHeader.split(" ")[1];
	if (!token) {
		return res
			.status(200)
			.json({ status: 400, success: false, message: "Token not found" });
			
	}
	try {
		// adding both id and user to request
		const decoded = jwt.verify(token, process.env.JWT_KEY);
		req._id = decoded._id;
		const user = await User.findOne({ _id: decoded._id });
		req.user = user;
		let tokenFound = user.tokens.find((tokens) => tokens["token"] === token);
		if (!tokenFound) {
			return res
				.status(200)
				.json({
					success: false,
					message: "AUTH_ERROR",
					error: { status: 401, message: "You are looged out!" },
				});
		}
		//attaching token for logout purpose
		req.token = token;
		next();
	} catch (err) {
		console.log(err);
		res
			.status(200)
			.send({
				success: false,
				message: "AUT_ERROR",
				error: { status: 400, message: "Invalid token!" },
			});
	}
};
