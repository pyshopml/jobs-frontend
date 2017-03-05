import IPost from '../../interfaces/ipost';

function fetchPostFromServer(id: number) {
  const url = `http://jobs.pyshop.ru/api/vacancies/${id}/`
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  return fetch(url, options)
}

export async function fetchPost(id: number,
                                done: (post: IPost) => any,
                                error: (msg: string) => any,
                                notFound: () => any){
  try {
    const res = await fetchPostFromServer(id);
    if(!res.ok)
      throw new Error(res.statusText);
    const post: IPost = await res.json();
    done(post);
  } catch (e) {
    if(e.message == 'Not Found'){
      notFound();
      return;
    }
    error(e.message);
  }
}