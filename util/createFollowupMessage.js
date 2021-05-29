const { client } = require("../bot");

module.exports = (token, data) => {
	return client.api
		.webhooks(require("../config.json").app_id, token)
		.post({ data: data });
};