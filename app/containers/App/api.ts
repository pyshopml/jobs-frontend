const verifyTokenOnServer = (data): Promise<Response> => {
  const options = {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify(data),
	};

	return fetch(`${config.apiUrl}account/authtoken/validate/`, options);
};

export async function verifyToken(auth_token: string, done): Promise<boolean> {
  try { 
    let res = await verifyTokenOnServer({ auth_token });

    if (res.ok) {
      done();
    }

  } catch (e) {
    return e.message;
  }
}