import React from 'react';
import PropTypes from 'prop-types';

export default function Fave({ name, image }) {
  return (
    <figure>
      <img src={image} alt={`image of ${name}`} />
      <figcaption>
        {name}
      </figcaption>
    </figure>
  );
}

Fave.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
