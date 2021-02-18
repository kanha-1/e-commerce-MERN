import { connect } from "react-redux";
import { Link } from "react-router-dom";
import utills from "../utils";
import { logoutUser } from "../redux/actions/userActions";
import { withRouter } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from '@material-ui/core/Badge';
const Navbar = ({ user, logoutUser, history, cart }) => {
	// console.log(cart.length)
	const handlelogout = () => {
		logoutUser(history);
	};
	return (
		<nav class="border split-nav fixed bg">
			<div className="nav-brand">
				<h3>
					<Link to="/home"> NextShop</Link>
				</h3>
			</div>
			<div className="collapsible">
				<input id="collapsible0" type="checkbox" name="collapsible0" />
				<label for="collapsible0">
					<div className="bar1"></div>
					<div className="bar2"></div>
					<div className="bar3"></div>
				</label>
				<div className="collapsible-body">
					<ul className="inline">
						{user ? (
							<>
								<li>
                  <IconButton>
									<Badge color="secondary" badgeContent={cart?.length}>
                  <Link to="/cart">
                  <ShoppingCartIcon />
                  </Link>
									</Badge>
                  </IconButton>
								</li>
								<li>
									<Link to="/order">Orders</Link>
								</li>
								<li>
									{" "}
									<h4 style={{ margin: "0" }}>
										{utills.limitDescription(user.name, 7)}
									</h4>
								</li>

								{/* <button onClick={handlelogout} > */}
								<ExitToAppIcon
									onClick={handlelogout}
									style={{ paddingTop: "5px", color: "red", cursor: "pointer" }}
								/>
								{/* </button> */}
							</>
						) : (
							<>
								<li>
									<Link to="/login"> Login</Link>
								</li>
								<li>
									<Link to="/register"> Register</Link>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};

const mapStatetoProps = (storeData) => {
	return {
		user: storeData.userState.user,
		cart: storeData.cartState.cart,
	};
};

export default connect(mapStatetoProps, { logoutUser })(withRouter(Navbar));
