import { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { registerUser } from "../redux/actions/userActions";

const Registerpage = ({
  registerUser,
  user,
  history,
  responseFetchingState,
  response,
}) => {
  const inputName = useRef(null);
  const inputEmail = useRef(null);
  const inputPassword = useRef(null);
  const inputConfirmpassword = useRef(null);
  const inputSubmit = useRef(null);
  useEffect(() => {
    inputName.current.focus();
  }, []);

  //Using usestate hooks for state variables
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    showerrorState: true,
    buttonState: true,
    formerror: "",
    errors: {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
  });

  //Keyup function to focus on elements
  const handlekeyup = (e) => {
    const field = e.target.name;
    if (e.keyCode === 13) {
      switch (field) {
        case "name":
          inputEmail.current.focus();
          break;
        case "email":
          inputPassword.current.focus();
          break;
        case "password":
          inputConfirmpassword.current.focus();
          break;
        case "confirmpassword":
          inputSubmit.current.focus();
          inputSubmit.current.click();
          break;
        default:
          break;
      }
    }
  };

  // Submit handler to handle signup and using removeresponse to remove all the responses if signup function is not getting called
  const handlesubmit = () => {
    const { name, email, password, confirmpassword } = state;
    if (name && email && password) {
      const user = {
        name,
        email,
        password,
        confirmPassword: confirmpassword,
        role: "user",
      };
      registerUser({ user, history });
      setState({
        ...state,
        formerror: "",
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
      });
    } else {
      setState({ ...state, formerror: "Fields can't be empty!" });
    }
  };

  //Handle Change for updating the errors and control component
  const handlechange = (e) => {
    const validEmailRegex = RegExp(
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    );
    const validPasswordRegex = RegExp(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    );
    const name = e.target.name;
    const errors = state.errors;
    const value = e.target.value;
    switch (name) {
      case "name":
        errors.name =
          value.length < 5 || value.length > 20
            ? "Name must be between 5 and 20 characters!"
            : "";
        break;
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";

        break;
      case "password":
        errors.password = validPasswordRegex.test(value)
          ? ""
          : "Password must be minimum eight characters, at-least one letter and one number and one SC!";
        errors.confirmpassword =
          value === state.confirmpassword ? "" : "Passwords Not match";
        break;
      case "confirmpassword":
        errors.confirmpassword =
          state.password === value ? "" : "Passwords Not match";
        break;
      default:
        break;
    }
    if (
      errors.name === "" &&
      errors.email === "" &&
      errors.password === "" &&
      errors.confirmpassword === ""
    ) {
      state.buttonState = false;
    } else {
      state.buttonState = true;
    }
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  // Component
  return (
    <>
      <div class="form-group border padding-small margin-top-large lg-4 md-8 sm-10">
        {responseFetchingState ? (
          <div
            style={{ position: "absolute", top: "40%", left: "45%" }}
            class="lds-dual-ring"
          ></div>
        ) : null}
        <input
          onKeyUp={handlekeyup}
          ref={inputName}
          onChange={handlechange}
          class="input-block margin"
          style={{ width: "80%" }}
          type="text"
          id="paperInputs2"
          name="name"
          value={state.name}
          placeholder="Enter your Name"
        />
        {state.showerrorState ? (
          <p className="text-danger padding-left">{state.errors.name}</p>
        ) : (
          ""
        )}
        <input
          onKeyUp={handlekeyup}
          ref={inputEmail}
          onChange={handlechange}
          class="input-block margin"
          style={{ width: "80%" }}
          type="text"
          id="paperInputs2"
          name="email"
          value={state.email}
          placeholder="Enter your Email"
        />
        {state.showerrorState ? (
          <p className="text-danger padding-left">{state.errors.email}</p>
        ) : (
          ""
        )}

        <input
          onKeyUp={handlekeyup}
          ref={inputPassword}
          onChange={handlechange}
          class="input-block margin"
          style={{ width: "80%" }}
          type="password"
          name="password"
          id="paperInputs2"
          value={state.password}
          placeholder="Enter your Passowrd"
        />
        {state.showerrorState ? (
          <p className="text-danger padding-left">{state.errors.password}</p>
        ) : (
          ""
        )}
        <input
          onKeyUp={handlekeyup}
          ref={inputConfirmpassword}
          onChange={handlechange}
          class="input-block margin"
          style={{ width: "80%" }}
          type="password"
          id="paperInputs2"
          name="confirmpassword"
          value={state.confirmpassword}
          placeholder="Confirm password"
        />
        {state.showerrorState ? (
          <p className="text-danger padding-left">
            {state.errors.confirmpassword}
          </p>
        ) : (
          ""
        )}
        <input
          ref={inputSubmit}
          disabled={state.buttonState}
          onClick={handlesubmit}
          type="button"
          disabled={state.buttonState}
          className={
            state.buttonState ? "disabled margin btnr" : "btn-secondary margin btnb"
          }
          value="Register"
        />
        {response ? (
          <p className="text-primary padding-left">{response.message}:</p>
        ) : null}
        {state.formerror ? (
          <p className="text-danger padding-left">{state.formerror}:</p>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

const mapStatetoProps = (storeData) => {
  return {
    user: storeData.userState.user,
    responseFetchingState: storeData.userState.isUserResponsefetching,
    response: storeData.userState.userResponse,
  };
};

export default connect(mapStatetoProps, {
  registerUser,
})(Registerpage);
