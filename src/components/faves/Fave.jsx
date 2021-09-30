import React from 'react';
import PropTypes from 'prop-types';

const backendURL = 'https://full-stack-be.herokuapp.com/api/v1/favorites';

export default function Fave({ id, name, image }) {

  const removeCharacter = async (id) => {
    const res = await fetch(`${backendURL}/${id}`, {
      method: 'DELETE'
    });
    const deleted = await res.json();
      
    return deleted;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    removeCharacter(id);
    // .then(window.location = '/');
  };

  return (
    <>
      <figure>
        <img src={image} alt={`image of ${name}`} />
        <figcaption>
          {name}
        </figcaption>
      </figure>
      <form onSubmit={handleSubmit}>
        <button>Remove from Faves</button>
      </form>
    </>
  );
}

Fave.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
