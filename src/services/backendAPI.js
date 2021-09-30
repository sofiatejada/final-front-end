const backendURL = 'https://full-stack-be.herokuapp.com/api/v1/favorites';

export const fetchBackendData = async () => {
  const res = await fetch(`${backendURL}`);
  const data = await res.json();

  const caughtArray = await data.map(async (item) => {
    return ({
      id: item.id,
      name: item.name,
      image: item.image
    });
  });

  const resolvedArray = await Promise.all(caughtArray);

  return { caughtList: resolvedArray };
};

export const postToBackend = async (data) => {
  const res = await fetch(`${backendURL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const sentData = await res.json();

  return sentData;
};

export const deleteBackendData = async (id) => {
  const res = await fetch(`${backendURL}/${id}`, {
    method: 'DELETE'
  });
  const deleted = await res.json();

  return deleted;
};
