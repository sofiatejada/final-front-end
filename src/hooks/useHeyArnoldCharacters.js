import { useEffect, useState } from 'react';
import { fetchAllCharacters } from '../services/heyArnoldApi';

export default function useHeyArnoldCharacters() {

  const [characterList, setCharacterList] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllCharacters()
      .then((characters) => setCharacterList(characters))
      .finally(() => setLoading(false));
  }, []);

  return { characterList, loading };
}
