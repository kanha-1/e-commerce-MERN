import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { loginUser } from "../redux/actions/userActions";
import { connect } from "react-redux";

const Loginpage = ({
  loginUser,
  response,
  userFetchingState,
  user,
  history,
}) => {
  const inputEmail = useRef(null);
  const inputPassword = useRef(null);
  const inputSubmit = useRef(null);
  useEffect(() => {
    inputEmail.current.focus();
  }, []);

  //Using usestate hooks for state variables
  const [state, setState] = useState({
    email: "",
    password: "",
    showerrorState: true,
    buttonState: true,
    formerror: "",
    errors: {
      email: "",
    },
  });

  // Handle Submit
  const handleSubmit = () => {
    const { email, password } = state;
    if (email && password) {
      const object = {
        user: { email, password },
        history,
      };
      loginUser(object);
      setState({
        ...state,
        formerror: "",
        email: "",
        password: "",
      });
    } else {
      setState({ ...state, formerror: "Fields can't be empty!" });
    }
  };

  // Onchange function, setting errors and updating state
  const handleChange = (e) => {
    // SETTING ERRORS
    const validEmailRegex = RegExp(
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    );
    const name = e.target.name;
    const errors = state.errors;
    const value = e.target.value;
    switch (name) {
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      default:
        break;
    }
    if (errors.email === "") {
      state.buttonState = false;
    } else {
      state.buttonState = true;
    }

    //SETTING STATE FOR CONTROLLED FORM
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  // Handling autofocus on enter
  const handlekeyup = (e) => {
    const field = e.target.name;
    if (e.keyCode === 13) {
      switch (field) {
        case "email":
          inputPassword.current.focus();
          break;
        case "password":
          inputSubmit.current.focus();
          inputSubmit.current.click();
          break;
        default:
          break;
      }
    }
  };

  return (
    <div
      class="form-group border padding-small margin-top-large lg-4 md-4s sm-10"
      style={{ width: "35%" }}
    >
      {userFetchingState ? (
        <div
          style={{ position: "absolute", top: "35%", left: "45%" }}
          class="lds-dual-ring"
        ></div>
      ) : null}

      <input
        value={state.email}
        onChange={handleChange}
        onKeyUp={handlekeyup}
        ref={inputEmail}
        class="input-block margin"
        style={{ width: "80%" }}
        type="text"
        name="email"
        id="paperInputs2"
        placeholder="Enter your Email"
      />
      {state.showerrorState ? (
        <p className="text-danger padding-left">{state.errors.email}</p>
      ) : (
        ""
      )}
      <input
        value={state.password}
        onChange={handleChange}
        onKeyUp={handlekeyup}
        ref={inputPassword}
        class="input-block margin"
        style={{ width: "80%" }}
        type="password"
        name="password"
        id="paperInputs2"
        placeholder="Enter your Passowrd"
      />
      <input
        onClick={handleSubmit}
        ref={inputSubmit}
        type="button"
        class="btn-secondary margin"
        value="Login"
        disabled={state.buttonState}
      />
      {state.formerror ? (
        <p className="text-danger padding-left">{state.formerror}:</p>
      ) : (
        ""
      )}
      {user ? (
        <p className="text-success padding-left">Logged in Successfully :D</p>
      ) : null}
      <p className="margin">
        Don't have an account?{" "}
        <Link style={{ textDecoration: "none" }} to="/register">
          <span className="text-secondary">Register here</span>
        </Link>
      </p>
    </div>
  );
};

const mapStatetoprops = (storeData) => {
  return {
    response: storeData.userState.userResponse,
    userFetchingState: storeData.userState.isUserResponsefetching,
    user: storeData.userState.user,
  };
};

export default connect(mapStatetoprops, { loginUser })(Loginpage);
