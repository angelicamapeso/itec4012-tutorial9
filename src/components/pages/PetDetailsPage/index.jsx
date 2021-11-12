import "./styles.css";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PetsOrderContext from "../../../context/petsOrderContext";

export const PetDetailsPage = (props) => {
  const {id} = useParams();
  const globalState = useContext(PetsOrderContext);

  const [pet, setPet] = useState(null);
  useEffect(() => {
    const pet = globalState.pets.find(pet => pet.id.stringValue === id);
    if (pet) {
      setPet(pet);
    } else {
      setPet(null);
    }
  }, [])

  if (pet) {
    return (
      <div className="pets-page">
        <h1 className="pets-title">{pet.name.stringValue}</h1>
        <img src={pet.image.stringValue} alt="" />
      </div>
    );
  } else {
    return (
      <div className="pets-page">
        <h1 className="pets-title">Sorry! That pet doesn't exist!</h1>
      </div>
    );
  }
}