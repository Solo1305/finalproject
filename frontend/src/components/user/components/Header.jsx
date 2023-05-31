import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeCart, removeUser } from "../../../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faSignOutAlt,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const user = useSelector((state) => state.userReducer);
  const cart = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  const removeUserFromStore = () => {
    dispatch(removeUser());
    dispatch(removeCart());
  };

  return (
    <div className="user-header">
      <div className="logo-container">
        <h1 className="m-0 shop-name">
          <Link to="/" className="logo">
            <span className="text-primary">Figurine</span>Shop
          </Link>
        </h1>
      </div>
      <div className="nav-items">
        <ul className="custom-navbar">
          {Object.keys(user).length === 0 ? (
            <>
              <li>
                <Link to="/login">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="icon pink-icon"
                  />
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    className="icon pink-icon"
                  />
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="cart">
                <Link to="/cart">
                  <FontAwesomeIcon icon={faShoppingCart} className="icon" />
                  {cart.length > 0 && (
                    <span className="cart-number">{cart.length}</span>
                  )}
                </Link>
              </li>
              <li>
                <Link to="" onClick={removeUserFromStore}>
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    className="icon pink-icon logout-icon"
                  />{" "}
                  Logout
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
