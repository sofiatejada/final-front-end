const URL = 'https://hey-arnold-api.herokuapp.com/api/v1/characters';

export const fetchAllCharacters = async () => {
  const res = await fetch(URL);
  const characters = await res.json();

  return (
    characters.map((character) => ({
      id: character._id,
      name: character.name,
      image: character.image,
    })));
};

export const fetchOneCharacter = async (id) => {
  const res = await fetch(`${URL}/${id}`);
  console.log(`${URL}/${id}`);
  const character = await res.json();

  return ({
    id: character._id,
    name: character.name,
    image: character.image,
  });
};



