import { INewPost } from 'interfaces';

function uploadPostToServer(post: INewPost, token: string) {
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    },
    body: JSON.stringify(post)
  };

  return fetch(`${config.apiUrl}vacancies/`, options)
}


function fetchCategoriesFromServer() {
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  return fetch(`${config.apiUrl}vacancies/categories/`, options)
}

export async function uploadPost(post: INewPost,
                                 token: string,
                                 done: (post) => any,
                                 error: (msg: string) => any) {
  try {
    const res = await uploadPostToServer(post, token);
    if (!res.ok)
      throw new Error(res.statusText);
    const createdPost = await res.json()
    done(createdPost);
  } catch (e) {
    error(e.message);
  }
}

export async function fetchCategories( done: (data) => any, error: (msg: string) => any) {
  try {
    const res = await fetchCategoriesFromServer();

    if (res.ok) {
      let data = await res.json();
      done(data);
    }

    error(res.statusText);

  } catch (e) {
    error(e.message);
  }
}