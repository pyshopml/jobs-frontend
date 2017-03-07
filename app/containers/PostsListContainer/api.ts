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

function postDateToObject(post){
  post.created_on = new Date(post.created_on);
  post.modified_on = new Date(post.modified_on);
  return post;
}

export async function fetchPosts(done: (data) => any,
                                 error: (msg: string) => any) {
  try {
    const url = 'http://jobs.pyshop.ru/api/vacancies/';
    const res = await fetchPostsFromServer(url);

    if (!res.ok)
      throw new Error(res.statusText);
    const data = await res.json();
    data.results = data.results.map(postDateToObject)
    done(data);
  } catch (e) {
    error(e.message);
  }
}

export async function fetchMorePosts(url: string,
                                     done: (data) => any,
                                     error: (msg: string) => any) {
  try {
    if (!url)
      return;
    const res = await fetchPostsFromServer(url);
    if (!res.ok)
      throw new Error(res.statusText);
    const data = await res.json();
    data.results = data.results.map(postDateToObject)
    done(data);
  } catch (e) {
    error(e.message);
  }
}