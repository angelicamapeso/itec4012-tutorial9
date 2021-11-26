import "./styles.css";
import PetsOrderContext from "../../../context/petsOrderContext";

import { useState, useContext, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useHistory } from "react-router-dom";

import { OrderItem } from "../../OrderItem";
import { Button } from "../../Button";



export const ShoppingCartPage = () => {
  const [order, setOrder] = useState([]);
  const globalState = useContext(PetsOrderContext);

  const history = useHistory();

  // check if current user logged in
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        history.push("/login");
      }
    });
  }, []);

  useEffect(() => {
    setOrder(globalState.order);
  }, [globalState])

  return (
    <div className="pets-page">
      <h1 className="pets-title">My Shopping Cart</h1>
      <div className="order">
        { order.map(item => <OrderItem
              id={item.id}
              name={item.name}
              image={item.image}
              age={item.age}
            />
        )}
        {
          order.length === 0 && <p>Not a creature was stirring ... not even a mouse.</p>
        }
        { order.length > 0 && <Button text="Checkout" type="primary"/>}
      </div>
    </div>
  );
};
