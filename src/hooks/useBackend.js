import { useEffect, useState } from 'react';
import { 
  fetchBackendData, 
  postToBackend, 
  deleteBackendData 
} from '../services/backendAPI';

export const useBEList = () => {
  const [backendList, setBackendList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBackendData()
      .then((list) => setBackendList(list))
      .finally(() => setLoading(false));
  }, []);

  return { backendList, loading };
};

export const useBEPost = (body) => {
  const [postObject, setPostObject] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    postToBackend(body)
      .then((item) => setPostObject(item))
      .finally(() => setLoading(false));
  }, []);

  return { postObject, loading };
};

export const useBEDelete = (id) => {
  const [deletedItem, setDeletedItem] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    deleteBackendData(id)
      .then((item) => setDeletedItem(item))
      .finally(() => setLoading(false));
  });

  return { deletedItem, loading };
};
