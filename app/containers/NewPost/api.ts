import INewPost from '../../interfaces/inewpost';
import IPost from '../../interfaces/ipost';

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

function postDateToObject(post){
  post.created_on = new Date(post.created_on);
  post.modified_on = new Date(post.modified_on);
  return post;
}

export async function uploadPost(post: INewPost,
                                 token: string,
                                 done: (post: IPost) => any,
                                 error: (msg: string) => any) {
  try {
    const res = await uploadPostToServer(post, token);
    if (!res.ok)
      throw new Error(res.statusText);
    const createdPost: IPost = await res.json().then((post) => postDateToObject(post));
    done(createdPost);
  } catch (e) {
    error(e.message);
  }
}