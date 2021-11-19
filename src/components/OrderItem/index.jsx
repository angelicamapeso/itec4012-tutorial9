import "./styles.css";
import PetsOrderContext from "../../context/petsOrderContext";

import { useContext } from "react";

import { Button } from "../Button";

export const OrderItem = (props) => {
  const { image, age, name, id } = props;
  const globalState = useContext(PetsOrderContext);
  const removePet = () => {
    globalState.removePetFromOrder(id);
  }

  return (
    <div className="order-item">
      <img className="order-item-photo" src={image} alt="Pet" />
      <div className="order-item-desc">
        <h1 className="order-item-name">{name}</h1>
        <p className="order-item-age">{age}</p>
      </div>
      <Button
        text="Remove Pet"
        type="secondary"
        isDisabled={false}
        action={removePet}
      />
    </div>
  );
}