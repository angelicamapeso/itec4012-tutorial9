import "./styles.css";

import { Link } from "react-router-dom";
import { Button } from "../Button";

export const PetItem = (props) => {
  const { image, age, name, breed, type, id } = props;

  return (
    <div className="pet">
      <img className="pet-photo" src={image} alt={`${name} ${breed}`} />
      <Link to={`/pet/${id}`}>
        <h1 className="pet-name">{ name }</h1>
      </Link>
      <p className="pet-breed">{ breed }</p>
      <p className="pet-age">{ age } years old</p>

      <Button
        text="Request Pet"
        type="primary"
        isDisabled={false}
        action={() => alert("Requested pet")}
      />
    </div>
  );
}