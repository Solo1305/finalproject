import { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../actions";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  console.log("myState", user);

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post(
        "http://localhost:5000/api/user/login",
        loginData
      );

      if (response.data.data) {
        dispatch(addUser(response.data.data));
        console.log(user);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.message === "Incorrect") {
        setMessage("Incorrect username or password");
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="heading-one">Login</h1>

        <form className="mt-5" onSubmit={loginSubmit}>
          <div className="field-container">
            <label htmlFor="username" className="input-label">
              <FontAwesomeIcon icon={faUser} /> Username <span>*</span>
            </label>
            <input
              type="text"
              className="custom-field w-100"
              id="username"
              placeholder="Username"
              name="username"
              required
              value={loginData.username}
              onChange={(e) =>
                setLoginData({ ...loginData, username: e.target.value })
              }
            />
          </div>

          <div className="field-container mt-2">
            <label htmlFor="password" className="input-label">
              <FontAwesomeIcon icon={faLock} /> Password <span>*</span>
            </label>
            <input
              type="password"
              className="custom-field w-100"
              id="password"
              required
              placeholder="Password"
              name="password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
          </div>

          <div className="error">
            <p>{message}</p>
          </div>
          <button className="submit-btn">Login</button>
        </form>

        <p className="login-para">
          Don't have an account!{" "}
          <Link to="/register" className="register-link">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
