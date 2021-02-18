import { connect } from "react-redux";
import { Link } from "react-router-dom";
import utills from "../utils";
import { logoutUser } from "../redux/actions/userActions";
import { withRouter } from "react-router-dom";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
const Navbar = ({ user, logoutUser, history }) => {
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
                  <ShoppingCartIcon style={{paddingTop: "10px"}}/>
                  <Link to="/cart">Cart</Link>
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
                  <ExitToAppIcon onClick={handlelogout} style={{paddingTop:"5px", color:"red",cursor: "pointer"}}/>
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
  };
};

export default connect(mapStatetoProps, { logoutUser })(withRouter(Navbar));
