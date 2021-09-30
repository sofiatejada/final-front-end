import React from 'react';
import { Link } from 'react-router-dom';
import Fave from './Fave.jsx';
import { useBEList } from '../../hooks/useBackend';

// eslint-disable-next-line max-len
const spinner = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/945673bd-feaf-46f2-9e69-82deb505b95a/d9uqsyv-367865ee-f6f7-48ed-ba74-bbfa2a36a52a.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzk0NTY3M2JkLWZlYWYtNDZmMi05ZTY5LTgyZGViNTA1Yjk1YVwvZDl1cXN5di0zNjc4NjVlZS1mNmY3LTQ4ZWQtYmE3NC1iYmZhMmEzNmE1MmEuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.N-qjErA2OUW5Hz32FymO9LfJUBrnvqgY378NpbRSmbo';

export default function FavesList() {

  const { backendList, loading } = useBEList();

  if(loading) {
    return (
      <img src={spinner} alt="loading gif" />
    );
  }
 
  return (
    <ul aria-label="fave-list" role="list">
      {backendList.map((character) => (
        <li key={character.id}>
          <Link key={character.id} to={`${character.id}`}>
            <Fave 
              id={character.id} name={character.name} image={character.image} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
