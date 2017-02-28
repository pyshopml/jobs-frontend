import INewPost from '../../interfaces/inewpost';
import IPost from '../../interfaces/ipost';

function submitPost(post: INewPost) {
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post)
  };

  return fetch('http://jobs.pyshop.ru/api/vacancies/', options)
    .then((res: any) => res.json())
}

export async function uploadPostToServer(post: INewPost,
                                         done: (post: IPost) => any,
                                         error: (msg: string) => any) {
  try {
    const createdPost: IPost = await submitPost(post);
    done(createdPost);
  } catch (e) {
    error(e.message);
  }
}