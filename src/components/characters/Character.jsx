import React from 'react';
import PropTypes from 'prop-types';

export default function Character({ name, image }) {
  return (
    <figure>
      <img src={image} alt={`image of ${name}`} />
      <figcaption>
        {name}
      </figcaption>
    </figure>
  );
}

Character.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
