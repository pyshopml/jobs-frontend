function retrieveData() {
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  return fetch('http://jobs.pyshop.ru/api/vacancies/', options).then(res => res.json());
}

export async function loadPostsFromServer(done, error: (msg: string) => void) {
  try {
    const res = await retrieveData();
    done(res);
  } catch (e) {
    error(e.message);
  }
}