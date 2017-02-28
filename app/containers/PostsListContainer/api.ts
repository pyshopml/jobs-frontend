function retrieveData(url : string) {
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  return fetch(url, options).then(res => res.json());
}

export async function loadPostsFromServer(done, error: (msg: string) => void) {
  try {
    const url = 'http://jobs.pyshop.ru/api/vacancies/';
    const res = await retrieveData(url);
    done(res);
  } catch (e) {
    error(e.message);
  }
}

export async function fetchMorePosts(url : string, done, error : (msg: string) => void) {
  try {
    
    if (url) {
      const res = await retrieveData(url);
      done(res);
    }

  } catch (e) {
    error(e.message);
  }
}