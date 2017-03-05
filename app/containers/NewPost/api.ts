import INewPost from '../../interfaces/inewpost';
import IPost from '../../interfaces/ipost';

function uploadPostToServer(post: INewPost) {
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post)
  };

  return fetch('http://jobs.pyshop.ru/api/vacancies/', options)
}

export async function uploadPost(post: INewPost,
                                         done: (post: IPost) => any,
                                         error: (msg: string) => any) {
  try {
    const res = await uploadPostToServer(post);
    if (!res.ok)
      throw new Error(res.statusText);
    const createdPost: IPost = await res.json();
    done(createdPost);
  } catch (e) {
    error(e.message);
  }
}