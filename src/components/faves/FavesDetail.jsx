import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const backendURL = 'https://full-stack-be.herokuapp.com/api/v1/favorites';
// eslint-disable-next-line max-len
const spinner = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/945673bd-feaf-46f2-9e69-82deb505b95a/d9uqsyv-367865ee-f6f7-48ed-ba74-bbfa2a36a52a.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzk0NTY3M2JkLWZlYWYtNDZmMi05ZTY5LTgyZGViNTA1Yjk1YVwvZDl1cXN5di0zNjc4NjVlZS1mNmY3LTQ4ZWQtYmE3NC1iYmZhMmEzNmE1MmEuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.N-qjErA2OUW5Hz32FymO9LfJUBrnvqgY378NpbRSmbo';

export default function FavesDetail() {

  const [character, setCharacter] = useState();
  const [loading, setLoading] = useState(true);
  const [changedName, setNameChange] = useState(null);
  const [changedImage, setImageChange] = useState(null);
  const { id } = useParams();

  const fetchBackendData = async () => {
    const res = await fetch(`${backendURL}/${id}`);
    const data = await res.json();
    console.log(data);
    return data;
  };

  useEffect(() => {
    fetchBackendData()
      .then((character) => setCharacter(character))
      .finally(() => setLoading(false));
  }, []);

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
        name: changedName ?? character.name,
        image: changedImage ?? character.image,
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

  if(loading) {
    return (
      <img src={spinner} alt="loading gif" />
    );
  }

  return (
    <main>
      <header>
        <Link to="/">
          Homepage
        </Link>
        <Link to="/personal/faves">
          Favorites
        </Link>
      </header>
      <figure>
        <img src={character.image} alt={`image of ${character.name}`} />
        <figcaption>
          {character.name}
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
    </main>
  );
}
