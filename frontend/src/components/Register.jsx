import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const navigate = useNavigate();
  const [regData, setRegData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [error, setError] = useState(false);

  const changeHandler = (e) => {
    setRegData({ ...regData, [e.target.name]: e.target.value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    try {
      const response = await Axios.post(
        "http://localhost:5000/api/user/register",
        regData
      );

      if (response.data === "User created") {
        navigate("/");
      }

      console.log(response);
    } catch (error) {
      console.log(error);
      if (error.response.data === "taken") {
        setError(true);
      }
    }
  };

  const navigateToLogin = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 m-auto">
          <div className="login-card">
            <h1 className="heading-one">Register</h1>

            <form className="mt-5" onSubmit={loginSubmit}>
              <div className="field-container">
                <label htmlFor="username" className="input-label">
                  <FontAwesomeIcon icon={faUser} /> Username <span>*</span>
                </label>
                <input
                  type="text"
                  className="custom-field"
                  id="username"
                  placeholder="Username"
                  name="username"
                  value={regData.username}
                  onChange={changeHandler}
                  required
                />
              </div>

              <div className="field-container mt-2">
                <label htmlFor="email" className="input-label">
                  <FontAwesomeIcon icon={faEnvelope} /> Email <span>*</span>
                </label>
                <input
                  type="email"
                  className="custom-field"
                  id="email"
                  placeholder="Email"
                  name="email"
                  value={regData.email}
                  onChange={changeHandler}
                  required
                />
              </div>

              <div className="field-container mt-2">
                <label htmlFor="password" className="input-label">
                  <FontAwesomeIcon icon={faLock} /> Password <span>*</span>
                </label>
                <input
                  type="password"
                  className="custom-field"
                  id="password"
                  placeholder="Password"
                  name="password"
                  value={regData.password}
                  onChange={changeHandler}
                  required
                  minLength={8}
                />
                {regData.password.length < 8 && (
                  <p className="error-message">
                    Password must be at least 8 characters long.
                  </p>
                )}
              </div>

              {error && (
                <div className="error">
                  <p>Username is already taken</p>
                </div>
              )}

              <button className="submit-btn">Register</button>
            </form>

            <p className="login-para">
              Already have an account!{" "}
              <Link to="/" className="register-link">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
