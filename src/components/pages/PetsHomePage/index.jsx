import "./styles.css";

import PetsOrderContext from "../../../context/petsOrderContext";

import { useEffect, useState, useContext } from "react";
import { PetItem } from "../../PetItem";
import { Search } from "../../Search";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useHistory } from "react-router-dom";

export const PetsHomePage = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);

  const [loading, setLoading] = useState(true);

  const [searchString, setSearchString] = useState('');

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
    getPets();
  }, []);

  useEffect(() => {
    handleSearchByBreed();
  }, [searchString])

  const getPets = async () => {
    try {
      const response = await fetch('https://firestore.googleapis.com/v1/projects/pets-api-40916/databases/(default)/documents/pets/');
      const data = await response.json();
      const formattedData = data.documents.map((item) => item.fields);
      // console.log(data);
      // console.log(formattedData);
      setPets(formattedData);
      setFilteredPets(formattedData);
      globalState.initializePets(formattedData);
    } catch(err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const handleSearchUpdate = (event) => {
    setSearchString(event.target.value);
  }

  const handleSearchByBreed = () => {
    if (searchString === '') {
      setFilteredPets(pets);
      return;
    }

    const petsFiltered = pets.filter(pet => {
      const breed = pet.breed.stringValue.toLowerCase();
      const isMatch = breed.indexOf(searchString.trim().toLowerCase());
      return isMatch !== -1;
    });
    setFilteredPets(petsFiltered);
  }

  return (
    <div className="pets-page">
      <h1 className="pets-title">All Pets</h1>
      <Search handleSearchUpdate={handleSearchUpdate} />
      <div className="pets-container">
        {
          filteredPets.map((pet) => (
            <PetItem
              key={pet.id.stringValue}
              image={pet.image.stringValue}
              name={pet.name.stringValue}
              breed={pet.breed.stringValue}
              age={pet.age.stringValue}
              type={pet.petType.stringValue}
              id={pet.id.stringValue}
            />
          ))
        }

        {
          !loading && filteredPets.length === 0 && <p>What's a {searchString}? Sounds exotic.</p>
        }

        {
          loading && <p>Rounding up the critters...</p>
        }
      </div>
    </div>
  );
};
