const getAuthorizeURL = (z, bundle) => {
	let url = "https://github.com/login/oauth/authorize";

	const urlParts = [
		`client_id=${process.env.CLIENT_ID}`,
		`state=${bundle.inputData.state}`,
		`redirect_uri=${encodeURIComponent(bundle.inputData.redirect_uri)}`,
		"response_type=code",
		`scope=${encodeURIComponent("repo gist user")}`,
	];

	return `${url}?${urlParts.join("&")}`;
};

const getAccessToken = async (z, bundle) => {
	const response = await z.request({
		url: "https://github.com/login/oauth/access_token",
		method: "POST",
		body: {
			client_id: process.env.CLIENT_ID,
			client_secret: process.env.CLIENT_SECRET,
			grant_type: "authorization_code",
			code: bundle.inputData.code,
		},
		headers: {
			"content-type": "application/x-www-form-urlencoded",
			Accept: "application/json",
		},
	});

	return {
		access_token: response.data.access_token,
	};
};

const includeBearerToken = (request, z, bundle) => {
	if (bundle.authData.access_token) {
		request.headers.Authorization = `Bearer ${bundle.authData.access_token}`;
	}

	return request;
};

const test = async (z, bundle) => {
	const response = await z.request({ url: "https://api.github.com/user" });
	return response;
};

module.exports = {
	config: {
		type: "oauth2",
		oauth2Config: {
			authorizeUrl: getAuthorizeURL,
			getAccessToken,
		},
		fields: [],
		test,
		connectionLabel: "{{json.login}}",
	},
	befores: [includeBearerToken],
	afters: [],
};