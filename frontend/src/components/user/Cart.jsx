import Header from "../user/components/Header";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { useEffect, useState } from "react";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer);
  const user = useSelector((state) => state.userReducer);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    calculateTotal();
  }, [cart]);

  const removeFromCart = async (item) => {
    const id = item._id;
    try {
      const dbcart = await Axios.patch(
        `http://localhost:5000/api/cart/removefromcart/${user.username}/${id}`
      );
      if (dbcart.data === "Item removed from cart") {
        alert("item is removed");
        dispatch({ type: "DELETE", payload: item });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculateTotal = () => {
    let totalAmount = 0;
    for (const item of cart) {
      totalAmount += item.price * item.count;
    }
    setTotal(totalAmount);
  };

  return (
    <>
      <Header />

      <div className="container my-5">
        {cart.length > 0 ? (
          cart.map((item, index) => {
            return (
              <div key={index} className="custom-card mt-4">
                <div className="row">
                  <div className="col-md-3">
                    <img src={item.image} alt="" className="img-fluid" />
                  </div>
                  <div className="col-md-6">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                    <p className="price">
                      <b>{item.price * item.count} TND</b>
                    </p>

                    <p>
                      <b>Count: {item.count} </b>
                    </p>
                  </div>
                  <div className="col-md-3 d-flex justify-content-end">
                    <button
                      className="btn btn-primary mt-auto"
                      onClick={() => removeFromCart(item)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h1 className="text-center">Cart is empty</h1>
        )}

        {cart.length > 0 && (
          <div className="text-center total-wrapper">
            <h4>Total: <span className="total-amount">{total} TND</span></h4>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
