import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Fave from './Fave';
import { Link } from 'react-router-dom';

const backendURL = 'https://full-stack-be.herokuapp.com/api/v1/favorites';
// eslint-disable-next-line max-len
const spinner = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/945673bd-feaf-46f2-9e69-82deb505b95a/d9uqsyv-367865ee-f6f7-48ed-ba74-bbfa2a36a52a.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzk0NTY3M2JkLWZlYWYtNDZmMi05ZTY5LTgyZGViNTA1Yjk1YVwvZDl1cXN5di0zNjc4NjVlZS1mNmY3LTQ4ZWQtYmE3NC1iYmZhMmEzNmE1MmEuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.N-qjErA2OUW5Hz32FymO9LfJUBrnvqgY378NpbRSmbo';

export default function FavesList() {
  const [backendList, setBackendList] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const fetchBackendData = async () => {
    const res = await fetch(`${backendURL}`);
    const data = await res.json();

    return data;
  };

  useEffect(() => {
    fetchBackendData()
      .then((list) => setBackendList(list))
      .finally(() => setLoading(false));
  }, []);

  if(loading) {
    return (
      <img src={spinner} alt="loading gif" />
    );
  }
 
  return (
    <>
      <header>
        <Link to="/">
          Homepage
        </Link>
        <Link to="/personal/faves">
          Favorites
        </Link>
      </header>
      <ul aria-label="fave-list" role="list">
        {backendList.map((character) => (
          <li key={character.id}>
            <Fave 
              id={character.id} name={character.name} image={character.image} />
          </li>
        ))}
      </ul>
    </>
  );
}
