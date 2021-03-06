var util = require('../util.js');


var DashboardObjectFactory = function () {};

DashboardObjectFactory.apiDashboardObject = function (options) {
	options = options || {};

	return {
		"type": "dashboard",
		"id": options.id || util.generateGUID(),
		"name": options.name,
		"owner": options.owner,
		"privilege": options.privilege,
		"widgets": options.widgets || []
	};
};


module.exports = DashboardObjectFactory;