const { validationResult } = require("express-validator");
const Cart = require("../models/cartModel");

module.exports = {
	addtocart: async function (req, res, next) {
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
			const { quantity } = req.query;
			const { productId } = req.body;
			const item = await Cart.findOne({ userId: req._id, productId });
			if (!quantity) {
				if (!item) {
					const cartitem = new Cart({
						productId,
						userId: req._id,
						quantity: 1,
					});
					await cartitem.save();
					return res
						.status(200)
						.json({
							success: true,
							message: "Product added to cart successfully!",
						});
				} else {
					item.quantity = item.quantity + 1;
					await item.save();
					return res
						.status(200)
						.json({
							success: true,
							message: "Product added to cart successfully!",
						});
				}
			} else {
				if (Number(quantity) > 0) {
					if (!item) {
						const cartitem = new Cart({
							productId,
							userId: req._id,
							quantity: Number(quantity),
						});
						await cartitem.save();
						return res
							.status(200)
							.json({
								success: true,
								message: `Product added to cart successfully with quantity-${quantity}!`,
							});
					} else {
						item.quantity = Number(quantity);
						await item.save();
						return res
							.status(200)
							.json({
								success: true,
								message: `Product added to cart successfully with quantity-${quantity}!`,
							});
					}
				} else {
					await Cart.findOneAndDelete({ userId: req._id, productId });
					return res
						.status(200)
						.json({
							success: true,
							message: `Product removed from cart successfully`,
						});
				}
			}
		} catch (error) {
			next(error);
		}
	},
	emptycart: async function (req, res, next) {
		try {
			await Cart.deleteMany({ userId: req._id });
			return res
				.status(200)
				.json({ success: true, message: "Cart items deleted successfully!" });
		} catch (error) {
			next(error);
		}
	},
	getcart : async function (req, res, next) {
		try {
		const cartItems =await Cart.find({userId:req._id}).select("quantity").populate({
		  path: "productId",
		  select: "name cost",
		});
		return res.status(200).json({success:true, cart:cartItems})
	  
		} catch (error) {
		  next(error);
		}
	  }
};
