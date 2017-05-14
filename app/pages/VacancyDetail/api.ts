function fetchVacancyFromServer(id: number) {
  const url = `${config.apiUrl}vacancies/${id}/`
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  return fetch(url, options)
}

export async function fetchVacancy(id: number,
                                done: (vacancy) => any,
                                error: (msg: string) => any,
                                notFound: () => any){
  try {
    const res = await fetchVacancyFromServer(id);
    if (res.status == 404){
      notFound();
      return;
    }
    if (!res.ok)
      throw new Error(res.statusText);
    const vacancy = await res.json()
    done(vacancy);
  } catch (e) {
    error(e.message);
  }
}