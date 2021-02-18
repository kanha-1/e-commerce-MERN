const { validationResult } = require("express-validator");
const User = require("../models/userModel");
const utils = require("../utills/roleconversion");
const jwt = require("jsonwebtoken");

module.exports = {
	register: async function (req, res, next) {
		if (!validationResult(req).isEmpty()) {
			//Check if there is any validation error.
			return res
				.status(200)
				.json({
					success: false,
					message: "VALIDATION_ERROR",
					error: { status: 400, errors: validationResult(req).mapped() },
				});
		}
		try {
			//check if user wants to register as an admin and provided passcode
			if (req.body.role === "admin") {
				if (process.env.PASSCODE !== req.body.passcode) {
					return res
						.status(200)
						.json({
							success: false,
							message: "PASSCODE_ERROR",
							error: { status: 400, message: "Correct Passcode required" },
						});
				}
			}
			//Check if user already exist
			let existingUser = await User.findOne({ email: req.body.email });
			const rolecode = utils.convertroletorolecode(req.body.role);
			if (existingUser) {
				// If user signes up for diffrent role with same id.
				if (existingUser.role.includes(rolecode)) {
					res
						.status(200)
						.json({
							success: false,
							message: "User already exist! Please login.",
							error: { status: 409, msg: "User already exist! Please login." },
						});
				} else {
					existingUser.role.push(rolecode);
					await existingUser.save();
					const token = await existingUser.generateAuthToken();
					return res
						.status(200)
						.json({
							success: true,
							message: "Registered successfully!",
							user: {
								name: existingUser.name,
								email: existingUser.email,
								role: existingUser.role,
							},
							token,
						});
				}
			} else {
				// Create a new user
				const user = new User(req.body);
				await user.save();
				const token = await user.generateAuthToken();
				return res
					.status(200)
					.json({
						success: true,
						message: "Registered successfully!",
						user: { name: user.name, email: user.email, role: user.role },
						token,
					});
			}
		} catch (error) {
			next(error);
		}
	},
	login: async function (req, res, next) {
		if (!validationResult(req).isEmpty()) {
			//Check if there is any validation error.
			return res
				.status(200)
				.json({
					success: false,
					message: "VALIDATION_ERROR",
					error: { status: 400, errors: validationResult(req).mapped() },
				});
		}
		try {
			//Check if user exist
			const user = await User.findByCredentials(
				req.body.email,
				req.body.password,
			);
			if (user === "password incorrect") {
				return res
					.status(200)
					.json({
						success: false,
						message: "Password incorrect!",
						error: { status: 400, message: "Password incorrect!" },
					});
			}
			if (user) {
				const token = await user.generateAuthToken();
				return res
					.status(200)
					.json({
						success: true,
						message: "Logged in successfully!",
						user: {
							_id: user._id,
							name: user.name,
							email: user.email,
							gender: user.gender,
							imagelink: user.imagelink,
							role: user.role,
						},
						token,
					});
			} else {
				return res
					.status(200)
					.json({
						success: false,
						message: "User doesnt exist! Please register first",
						error: {
							status: 400,
							message: "User doesnt exist! Please register first.",
						},
					});
			}
		} catch (error) {
			next(error);
		}
	},
	deactivateuser: async function (req, res, next) {
		try {
			const userId = req.body.userId;
			await User.updateOne(
				{ _id: userId },
				{ isActive: false },
				(err, result) => {
					if (err) {
						next(err);
					}
					return res
						.status(200)
						.json({ success: true, message: "User decativated successfully!" });
				},
			);
		} catch (error) {
			next(error);
		}
	},
	activateuser: async function (req, res, next) {
		try {
			const userId = req.body.userId;
			await User.updateOne(
				{ _id: userId },
				{ isActive: true },
				(err, result) => {
					if (err) {
						next(err);
					}
					return res
						.status(200)
						.json({ success: true, message: "User activated successfully!" });
				},
			);
		} catch (error) {
			next(error);
		}
	},
	getallusers: async function (req, res, next) {
		try {
			const users = await User.find({ role: [1] }).select(
				"name email isActive",
			);
			return res.status(200).json({ success: true, users });
		} catch (error) {
			next(error);
		}
	},
	logout:async function (req, res, next) {
		try {
			const user = req.user;
			user.tokens = user.tokens.filter((token) => {
				return token.token != req.token;
			});
			await user.save();
			res
				.status(200)
				.json({ success: true, message: "Logged out successfully!" });
		} catch (error) {
			next(error);
		}
	}
};
