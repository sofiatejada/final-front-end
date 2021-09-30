import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOneCharacter } from '../services/heyArnoldApi';

export default function useHeyArnoldCharacterDetail() {

  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOneCharacter(id)
      .then((character) => setCharacter(character))
      .finally(() => setLoading(false));
  }, [id]);

  return { character, loading };
}
