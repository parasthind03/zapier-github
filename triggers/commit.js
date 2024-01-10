const sample = require("../samples/sample_commit");

const triggerIssue = (z, bundle) => {
	const responsePromise = z.request({
		method: "GET",
		url: `https://api.github.com/repos/${bundle.inputData.repo}/commits`,
	});
	return responsePromise.then((response) => {
		let res = JSON.parse(response.content);
		res = res.map((el, i) => {
			return { id: i + 1, ...el };
		});

		return res;
	});
};

module.exports = {
	key: "commit",
	noun: "Commit",

	display: {
		label: "New Commit",
		description: "Triggers on a new commit in a repo.",
	},

	operation: {
		inputFields: [
			{
				key: "repo",
				label: "Repo",
				required: true,
				dynamic: "repo.full_name.full_name",
			},
		],
		perform: triggerIssue,

		sample: sample,
	},
};
