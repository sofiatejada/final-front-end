import React, { useState } from 'react';
import PropTypes from 'prop-types';

const backendURL = 'https://full-stack-be.herokuapp.com/api/v1/favorites';

export default function Fave({ id, name, image }) {
  return (
    <>
      <figure key={id}>
        <img src={image} alt={`image of ${name}`} />
        <figcaption>
          {name}
        </figcaption>
      </figure>
    </>
  );
}

Fave.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
