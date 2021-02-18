const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			require: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: Array,
		isActive: { type: String, default: true },
		tokens: [
			{
				token: {
					type: String,
					required: true,
				},
			},
		],
	},
	{ timestamps: true },
);

userSchema.pre("save", async function (next) {
	// this pre function will run evrytime when you
	// will run user.save() before it. This func
	// is hashing the password before saving if
	// password is changed.
	const user = this;
	if (user.isModified("password")) {
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(user.password, salt);
	}
	next();
});

userSchema.pre("save", function (next) {
	//this function wil assign a role code.
	if (this.role[0] === "user") {
		this.role = 1;
	} else if (this.role[0] === "admin") {
		this.role = 2;
	}

	next();
});
userSchema.methods.generateAuthToken = async function () {
	// Generate an auth token for the user
	const user = this;
	const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
		expiresIn: "6h",
	});
	user.tokens = user.tokens.concat({ token });
	await user.save();
	return token;
};

userSchema.statics.findByCredentials = async function (email, password) {
	// Search for a user by email and check if password matched.
	const user = await User.findOne({ email });
	if (user) {
		const isPasswordMatch = await bcrypt.compare(password, user.password);
		if (isPasswordMatch) {
			return user;
		} else {
			return "password incorrect";
		}
	}
};

const User = mongoose.model("user", userSchema);

module.exports = User;
