import { useState } from 'react';
import './App.css';
import { PetProfile, Pets } from "./ui-components";
import { NavBar } from './ui-components';
import { Footer } from './ui-components';
import { AddPet } from './ui-components';
import { PetDetails } from './ui-components';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Storage } from "@aws-amplify/storage";



function App({ user, signOut}) {
  
  async function saveFile() {
    await Storage.put("test.txt", "Hello");
  };
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [pet, setPet] = useState();

  const [updatePet, setUpdatePet] = useState();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [about, setAbout] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState("");

  const formOverride = {

    TextField29766922: {
      placeholder: name
    },
    TextField29766923: {
      placeholder: age
    },
    TextField29766924: {
      placeholder: breed
    },
    TextField3858406: {
      placeholder: about
    },
    TextField3858413: {
      placeholder: color
    },
    TextField3858420: {
      placeholder: image
    },
    image: {
      src: updatePet == null 
        ? "https://images.unsplash.com/photo-1575405552798-85d86adf49a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8aG9yc2V8fHx8fHwxNjUyNTY0NTE0&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
        : updatePet.image,
    },
    Button38674195: { //update
      isDisabled: !updatePet ? true : false,
    },
    Button29766926: {
      isDisabled: updatePet ? true : false,
    },

    MyIcon: {
      style: {
        cursor: "pointer",
      },
      onClick: () => {
        setShowForm(false);
      },
    },
  };
  const navbarOverrides = {

    Button: {
      onClick: signOut,
    },
    image: {
      src: user?.attributes?.profile,
      // src: "https://images.unsplash.com/photo-1538128835124-7805d3fd3f43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2F0fHx8fHx8MTY1MjczMzE2Mw&ixlib=rb-1.2.1&q=80&utm_campaign=apicredit&utm_medium=referral&utm_source=unsplash_source&w=1080",
    },
    "Add Pet": {
      style: {
        cursor: "pointer"
      },
      onClick: () => {
        saveFile();
        setShowForm(!showForm);
      },
    },
  };
  return (
    <div className="App">
      <NavBar width={"100%"} overrides={navbarOverrides} />
      <header className="App-header">
        {showDetails && (
          <PetDetails
            pet={pet}
            style={{
              textAlign: "left",
              margin: "1rem",
              marginbottom: "1rem"
            }}
            overrides={{
              Close: {
                onClick: () => {
                  setShowDetails(false);
                },
                style: {
                  cursor: "pointer"
                },
              },
            }}
          />
        )}

        {showForm && (
          <AddPet
          pet={updatePet}
            overrides={formOverride}
            style={{
              textAlign: "left",
              margin: "1rem",
            }} 
          />
        )}

        <Pets
          overrideItems={({ item, index }) => ({
            overrides: {
              Breed: {color: "blue"},

              Button29766907: {
                onClick: () => {
                  setShowDetails(!showDetails);
                  setPet(item);
                },
              },
              Button3852427: {
                onClick: () => {
                  if (!showForm) setShowForm(true);
                  setUpdatePet(item);
                  setName(item.name);
                  setColor(item.color);
                  setAge(item.age);
                  setBreed(item.breed);
                  setAbout(item.about);
                  setImage(item.image);
                }
              }

            },
          })}
        />

      </header>
      <Footer width={"100%"} />
    </div>
  );
}

export default withAuthenticator(App);
