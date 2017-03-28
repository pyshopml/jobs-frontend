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

  return fetch('http://jobs.pyshop.ru/api/vacancies/', options)
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