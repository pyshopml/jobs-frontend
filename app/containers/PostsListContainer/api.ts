function fetchPostsFromServer(url: string) {
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  return fetch(url, options)
}

export async function fetchPosts(done: (data) => any, error: (msg: string) => any) {
  try {
    const url = 'http://jobs.pyshop.ru/api/vacancies/';
    const res = await fetchPostsFromServer(url);

    if (res.ok) {
      let data = await res.json();
      done(data);
    }

    error(res.statusText);
    
  } catch (e) {
    error(e.message);
  }
}
