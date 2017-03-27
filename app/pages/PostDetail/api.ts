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
                                done: (post) => any,
                                error: (msg: string) => any,
                                notFound: () => any){
  try {
    const res = await fetchPostFromServer(id);
    if (res.status == 404){
      notFound();
      return;
    }
    if (!res.ok)
      throw new Error(res.statusText);
    const post = await res.json()
    done(post);
  } catch (e) {
    error(e.message);
  }
}