import React, { useState } from 'react';
import PropTypes from 'prop-types';

const backendURL = 'https://full-stack-be.herokuapp.com/api/v1/favorites';

export default function Fave({ id, name, image }) {

  const [changedName, setNameChange] = useState(null);
  const [changedImage, setImageChange] = useState(null);

  const removeCharacter = async (id) => {
    const res = await fetch(`${backendURL}/${id}`, {
      method: 'DELETE'
    });
    const deleted = await res.json();
      
    return deleted;
  };
  const updateCharacter = async (id) => {

    const res = await fetch(`${backendURL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: changedName ?? name,
        image: changedImage ?? image,
      })
    });
    const formData = await res.json();
    console.log(formData);
      
    return formData;
  };

  const handleDeleteSubmit = (event) => {
    event.preventDefault();
    removeCharacter(id);
    // .then(window.location = '/');
  };

  const handlePutSubmit = (event) => {
    event.preventDefault();
    updateCharacter(id);
  }

  const handleNameChange = (event) => {
    setNameChange(event.target.value)
  }
  const handleImageChange = (event) => {
    setImageChange(event.target.value)
  }

  console.log(changedName ?? name, changedImage)

  return (
    <>
      <figure>
        <img src={image} alt={`image of ${name}`} />
        <figcaption>
          {name}
        </figcaption>
      </figure>
      <form onSubmit={handleDeleteSubmit}>
        <button>Remove from Faves</button>
      </form>
      <form onSubmit={handlePutSubmit}>
        <input onChange={handleNameChange} type="text" placeholder="name" />
        <input onChange={handleImageChange} type="url" placeholder="image" />
        <button>Change stuff!</button>
      </form>
    </>
  );
}

Fave.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
